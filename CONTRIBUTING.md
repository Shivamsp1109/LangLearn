# Working on LangLearn

## Branching: trunk-based development
- `main` is always deployable. Never commit to it directly.
- Each piece of work gets a short-lived branch named `<phase>/<topic>`, e.g. `phase-1/auth`.
- Changes land through a **pull request** with green CI. The PR is where code review happens.

## Commit messages: Conventional Commits
Format: `type(scope): short summary`

| type | for |
|---|---|
| `feat` | new behaviour |
| `fix` | bug fix |
| `docs` | documentation only |
| `chore` | tooling, config, dependencies |
| `ci` | CI/CD pipelines |
| `test` | tests only |
| `refactor` | code change with no behaviour change |

Examples: `feat(auth): add refresh token rotation`, `ci(backend): cache pnpm store`.

## Local setup

### Prerequisites
- Node.js 24 LTS (see `.nvmrc`)
- pnpm 12: `npm install -g pnpm@12`
- Docker Desktop

### Infrastructure (MySQL + Redis)
```bash
cd infra/docker
cp .env.example .env        # then edit the passwords
docker compose up -d --wait # start and wait until healthy
docker compose --profile tools up -d   # optional: Adminer DB UI on http://localhost:8080
docker compose down         # stop (keeps data)
docker compose down -v      # stop and DELETE all data
```

### Backend
```bash
cd backend
pnpm install
pnpm lint && pnpm typecheck && pnpm test && pnpm build
pnpm format                 # auto-format everything
```
