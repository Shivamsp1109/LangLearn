# Step 1: System design (learning guide)

## What was built
- `docs/DESIGN.md`: the full system design. No code yet.
- `README.md`, `.gitignore`, `.gitattributes`: repo basics.

## What to learn (basics → advanced)

Read the topic, then find where it appears in `DESIGN.md` (section numbers in brackets).

### Level 1: Basics
1. **Client–server architecture and REST**: HTTP methods, status codes, JSON, resource naming. [§7]
2. **Relational database basics**: tables, primary/foreign keys, one-to-many vs many-to-many, join tables (`user_roles`). [§6]
3. **Indexes**: what a B-tree index is and why `(user_id, due_at)` is indexed. [§6.1]
4. **Git monorepo basics** and what `.gitignore` / `.gitattributes` do (CRLF vs LF). [§9]
5. **What Docker is**: image vs container, and why "works on my machine" goes away. [§4.4]

### Level 2: Intermediate
6. **Authentication with JWT**: access vs refresh tokens, why access tokens are short-lived. [§7.1]
7. **Refresh-token rotation and reuse detection** (token families). Search: "OAuth refresh token rotation". [§7.1]
8. **Password hashing**: bcrypt vs argon2id, and why hashing ≠ encryption. [§11]
9. **Cursor vs offset pagination**. [§7]
10. **Idempotency**: why retries must be safe, and the Idempotency-Key header. [§7.6, §8.2]
11. **Caching and Redis data structures**: strings, hashes, **sorted sets** (leaderboards). [§3.2, §6.2]
12. **Message queues / background jobs**: why slow work leaves the request path (BullMQ). [§3.1]
13. **MVVM + unidirectional data flow on Android**. [§4.1, §8.2]
14. **Offline-first apps**: local DB as the source of truth, sync, conflict resolution. [§8.2]
15. **Spaced repetition (SM-2 algorithm)**: read the original SuperMemo SM-2 description. [§6.1 `user_vocab`]

### Level 3: Advanced
16. **Monolith vs modular monolith vs microservices**: the trade-offs, and when to split. [§3.1]
17. **WebSockets vs SSE vs polling**, and why scaling WebSockets needs a Redis adapter + sticky sessions. [§3, §7.5, §10.3]
18. **UUIDv4 vs UUIDv7 vs auto-increment keys** and their effect on InnoDB clustered indexes. [§6]
19. **Event/ledger modelling** (append-only `xp_events`) vs mutable counters. [§6.2]
20. **Transformer architecture, at a high level only for now**: encoder, decoder, attention, tokenization. Watch 3Blue1Brown's "Transformers" and "Attention" videos. We go deep in Phase 4. [§5]
21. **Fine-tuning vs training from scratch; what LoRA is (one-paragraph level)**. [§5.1]
22. **BLEU / chrF metrics**: how translation quality is measured. [§5.2]
23. **CI/CD concepts**: pipeline stages, container registry, **GitOps** (Argo CD pulls from Git vs CI pushes to the cluster). [§10]
24. **Kubernetes vocabulary**: Pod, Deployment, Service, Ingress, ConfigMap, Secret, probes, HPA. Just the definitions for now. [§10.3]

## Questions to answer during review
1. Why is `realtime` a separate service but `auth` is not?
2. What goes wrong if the Android app calls `ai-service` directly?
3. Why does `exercise_attempts.id` come from the client instead of the server?
4. Why store XP as events *and* as `enrollments.xp_total`? What keeps them consistent?
5. What happens with the leaderboard if Redis restarts? Is that acceptable?
6. Open questions in `DESIGN.md` §14: what's your opinion on each?
