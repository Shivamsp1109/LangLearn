# Phase 0: Foundation (learning guide)

## What was built

| Area | Files | Purpose |
|---|---|---|
| Editor/repo hygiene | `.editorconfig`, `.nvmrc`, `.gitattributes` | Same formatting and Node version everywhere |
| Backend workspace | `backend/package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml` | One pnpm workspace for all backend apps and libraries |
| TypeScript config | `backend/tsconfig.base.json`, `packages/shared/tsconfig*.json` | Strict compiler settings shared by every package |
| Code quality | `backend/eslint.config.mjs`, `.prettierrc.json`, `.prettierignore` | Linting (bugs) + formatting (style), kept separate |
| Shared package | `backend/packages/shared/src/*` | The 13 languages and 12 courses, as typed constants + tests |
| Local infra | `infra/docker/docker-compose.yml`, `.env.example`, `mysql/init/*.sql` | MySQL 8.4 + Redis 8 (+ optional Adminer UI) |
| CI | `.github/workflows/backend-ci.yml`, `infra-ci.yml` | Lint/typecheck/test/build; boot the Docker stack and smoke-test it |
| Automation | `.github/dependabot.yml`, `pull_request_template.md` | Automatic dependency updates; consistent PRs |
| Process | `CONTRIBUTING.md` | Branching, commit format, local setup |

### How the pieces connect
```
you push a branch ──► GitHub opens/updates the PR
                         ├─ backend-ci (only if backend/** changed)
                         │    install (frozen lockfile) → format → lint → typecheck → test → build
                         └─ infra-ci   (only if infra/docker/** changed)
                              compose config → up --wait (healthchecks) → smoke tests → down
```

## Decisions and why

| Decision | Why | Alternative rejected |
|---|---|---|
| **pnpm** workspaces | Strict dependency isolation (a package can't use what it didn't declare), fast, disk-efficient | npm/yarn workspaces: looser, slower |
| **Vitest** instead of Jest | Native TS + ESM, zero config, same `describe/it/expect` API | Jest needs ts-jest/babel and ESM workarounds |
| **TypeScript 6.0**, not 7.0 | TS 7 (the rewrite in Go) is out, but `typescript-eslint` only supports TS < 6.1 so far. Tools in an ecosystem move at different speeds | TS 7: faster compiler, but it would break linting today |
| **ESM** (`"type": "module"`) | The modern JS module standard. Node 24 can still `require()` ESM, so NestJS (CommonJS) can use our shared package | CommonJS: legacy |
| `noUncheckedIndexedAccess` | `arr[0]` is typed `T \| undefined`, which forces you to handle "missing". Catches a whole class of runtime crashes | Default TS: assumes the index always exists |
| Separate `tsconfig.json` / `tsconfig.build.json` | Type-check tests, but don't ship them in `dist/` | One config: tests end up in the build |
| ESLint + Prettier, with `eslint-config-prettier` | Each tool does one job: ESLint finds bugs, Prettier formats | Formatting via ESLint rules: slow and they conflict |
| Languages as `as const` data with a derived `LanguageCode` type | One source of truth: add a language to the object and the type updates automatically | A separate enum + list that can drift apart |
| MySQL **8.4** | MySQL's LTS line, the most widely supported by tools | 9.x: newer, less tool support |
| MySQL **utf8mb4** | Full Unicode. MySQL's old `utf8` can't store all CJK characters or emoji | `utf8` (actually utf8mb3) |
| Separate `langlearn_test` DB | Tests can wipe their DB freely without touching dev data | Shared DB |
| Compose **healthchecks** + `up --wait` | "Container started" ≠ "MySQL ready". Waiting on health prevents flaky startup | `sleep 30` in scripts |
| Compose **profiles** (Adminer under `tools`) | Optional services don't start unless asked | Always running |
| CI **path filters** + **concurrency** | A docs change doesn't build the backend; a new push cancels the outdated run | Building everything every time |
| `permissions: contents: read` in CI | Least privilege: a compromised step can't push code | The default token permissions are broader |
| Object storage **postponed** | MinIO stopped publishing community images in late 2025. We pick a replacement when we first need storage (Phase 3) | Pinning an old, unmaintained image |

## What to learn (basics → advanced)

### Level 1: Basics
1. **Git branches and pull requests.** Read `CONTRIBUTING.md`, then look at this PR on GitHub.
2. **Conventional Commits**: conventionalcommits.org (5 min).
3. **package.json**: `scripts`, `devDependencies`, `engines`, `"type": "module"`. [`backend/package.json`]
4. **Lockfiles**: why `pnpm-lock.yaml` is committed, and what `--frozen-lockfile` does. [`backend-ci.yml`]
5. **Docker basics**: image, container, port mapping (`3306:3306`), volumes, environment variables. [`docker-compose.yml`]
6. **YAML syntax**: lists, maps, multi-line strings (`|`).

### Level 2: Intermediate
7. **TypeScript compiler options**: read each option in `tsconfig.base.json` at typescriptlang.org/tsconfig.
8. **TS: `as const`, `keyof typeof`, type guards (`value is X`), `satisfies`.** [`languages.ts`, `courses.ts`]
9. **ES modules vs CommonJS**: why imports end in `.js` even in `.ts` files (NodeNext resolution). [`index.ts`]
10. **Monorepos and pnpm workspaces**: `pnpm -r`, workspace packages, the `exports` field. [`pnpm-workspace.yaml`, `shared/package.json`]
11. **ESLint flat config and type-aware linting** (`recommendedTypeChecked`, `projectService`). [`eslint.config.mjs`]
12. **Unit testing with Vitest**: `describe`, `it`, `expect`, matchers. [`courses.test.ts`]
13. **Docker Compose**: services, named volumes, healthchecks, `depends_on: condition`, profiles, `.env` interpolation, why `$$` escapes `$`. [`docker-compose.yml`]
14. **MySQL character sets and collations**: utf8mb4 vs utf8mb3, what `_0900_ai_ci` means. [`docker-compose.yml`]
15. **GitHub Actions basics**: workflow, trigger (`on`), job, step, `uses` vs `run`, runners. [`backend-ci.yml`]

### Level 3: Advanced
16. **CI design**: fail fast (cheap checks first), caching, path filters, `concurrency`. [`backend-ci.yml`]
17. **CI security**: the `GITHUB_TOKEN` and `permissions`, least privilege, why actions are pinned to versions (and why some teams pin to commit SHAs). [both workflows]
18. **Integration/smoke testing infrastructure in CI**: booting real services in a pipeline. [`infra-ci.yml`]
19. **Supply-chain hygiene**: Dependabot, grouped updates, semver ranges (`^` vs `~`). [`dependabot.yml`, `package.json`]
20. **Docker image tag strategy**: `mysql:8.4` vs `mysql:latest` vs pinning a digest. [`docker-compose.yml`]
21. **Redis persistence**: RDB snapshots vs AOF (`--appendonly yes`). [`docker-compose.yml`]

## Run it yourself
1. Install **Node 24 LTS**, **Docker Desktop** and **pnpm 12** (`npm i -g pnpm@12`).
2. `cd backend && pnpm install && pnpm test`
3. `cd infra/docker && cp .env.example .env && docker compose up -d --wait && docker compose ps`
4. Connect to MySQL with any client (localhost:3306, user `langlearn`) and run `SHOW DATABASES;`.
5. Experiments that teach a lot:
   - Break formatting in a `.ts` file → `pnpm format:check` fails.
   - Write `const x = [1][5]; x.toFixed();` → typecheck fails (thanks to `noUncheckedIndexedAccess`).
   - Call an async function without `await` → lint fails (`no-floating-promises`).
   - `docker compose down` then `up` again → the data is still there. `down -v` → it's gone. Why?

## Questions to answer during review
1. Why does `infra-ci` copy `.env.example` instead of committing a `.env`?
2. What would break if `pnpm-lock.yaml` were in `.gitignore`?
3. Why does `isLanguageCode` use `Object.hasOwn` instead of `value in LANGUAGES`? (Hint: look at the test.)
4. The init SQL hardcodes the user `'langlearn'`. What happens if someone changes `MYSQL_USER` in `.env`? How could this be improved?
5. Why are there two triggers (`push` to main and `pull_request`) in each workflow?
