# Web App Template

Minimal starter for GitHub-centered AI development of public web apps and games.

It includes:

- Vite + TypeScript + npm
- Vitest unit tests
- Playwright Chromium E2E
- centralized reusable CI
- guarded native auto-merge for ordinary PRs
- deployment of the exact CI-verified artifact to GitHub Pages
- shared instructions for Claude and Codex

## Start locally

```sh
npm ci
npm run dev
```

## Verify

```sh
npm run typecheck
npm test
npm run build
npm run test:e2e
```

When creating a repository from this template, replace the starter product name
and update `SPEC.md`. Keep `.github/**` unchanged during ordinary product work.

`npm test` also verifies that all three workflow callers still use the protected
`ai-dev-infra@v2` contract, including the permissions and concurrency settings
that reusable workflows cannot enforce for their callers.
