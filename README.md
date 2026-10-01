# LangLearn

A two-way language-learning Android app with its own translation models, trained from scratch.

- **English speakers learn Hindi.**
- **Speakers of Chinese, Japanese, Korean, Spanish, Turkish, French, Dutch, German, Italian, Polish and Swedish learn English.**

| Layer | Tech |
|---|---|
| Android | Kotlin, Jetpack Compose, Hilt, Room, Retrofit, WorkManager |
| Backend | Node.js + TypeScript (NestJS), Socket.IO, BullMQ |
| Database | MySQL 8, Redis |
| AI | Python, PyTorch: from-scratch Transformer, LoRA fine-tuning, FastAPI serving |
| DevOps | Docker, GitHub Actions, Kubernetes, Helm, Argo CD, Prometheus/Grafana |

## Docs
- [System design](docs/DESIGN.md)
- [Contributing and local setup](CONTRIBUTING.md)
- [Learning guides](docs/learning/): one per step, covering what was built and what to learn

## Repository layout
```
backend/        pnpm workspace: apps/ (services) + packages/shared
infra/docker/   Docker Compose for local MySQL + Redis
.github/        CI workflows, Dependabot, PR template
docs/           Design doc + learning guides
```
`android/` and `ai/` are added in later phases.

## Status
Phase 0 (foundation) is in review.
