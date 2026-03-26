# Contributing to Awsume

Thank you for your interest in contributing! This guide will help you get started.

## Prerequisites

- [Bun](https://bun.sh) >= 1.0.0
- AWS CLI configured with SSO profiles (for testing)
- Git

## Development Setup

```bash
git clone https://github.com/tux86/awsume.git
cd awsume
bun install

# Run CLI
bun run cli

# Run desktop app
bun run gui

# Lint
bun run lint
```

## Project Structure

```
awsume/
├── packages/
│   ├── core/       # Shared components + credential logic
│   ├── cli/        # Terminal UI
│   └── gui/        # Electron desktop app
├── .github/        # Workflows and templates
└── package.json    # Workspace root
```

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

**Scopes:** `core`, `cli`, `gui`, `deps`

Commits are validated by [commitlint](https://commitlint.js.org/) via a Git hook.

## Changesets

After user-facing changes, **always add a changeset**:

```bash
bun run changeset
```

**Bump types:** `patch` (bug fixes), `minor` (new features), `major` (breaking changes)

## Pull Request Process

1. Fork the repo and create a branch from `main`
2. Make your changes with conventional commits
3. Add a changeset if the change is user-facing
4. Ensure `bun run lint` passes
5. Open a PR using the provided template

## Code Style

- TypeScript strict mode
- React functional components with hooks
- Shared UI and logic in `@awsume/core`
- Business logic separated from UI (see `core/src/aws-creds.ts`)

## Building

```bash
# CLI binary
bun run build

# Output: dist/awsume
```

## Questions?

Open an [issue](https://github.com/tux86/awsume/issues) or start a [discussion](https://github.com/tux86/awsume/discussions).
