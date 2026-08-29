# AGENTS.md

Working agreement for AI agents on this repository.

## Source of truth

- GitHub `main` is the single source of truth.
- Always start from the latest `main`; fetch/rebase before finalizing when a
  remote is available.

## Concurrency

- Do not run multiple AI coding agents on this repository at the same time.

## Scope

- Normal product work must not change `.github/**`. CI and repository plumbing
  are a human-reviewed administration boundary.
- CI is owned by `mukkii-game/ai-dev-infra`; this repository only calls it.

## Documentation

- Read `SPEC.md` before changing behavior and update it with behavior changes.
- Append durable design decisions to `DECISIONS.md`, briefly.
- Track work in GitHub Issues rather than a repository `TODO.md`.

## Autonomy

- Make reversible implementation decisions autonomously.
- Ask a human only when a change is irreversible, outward-facing, or conflicts
  with this file.

## Local commands

```
npm ci
npm run typecheck
npm test
npm run build
npm run test:e2e
```
