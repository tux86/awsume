# Contributing to Toolbox

Thank you for your interest in contributing! This guide will help you get started.

## Prerequisites

- [Bun](https://bun.sh) >= 1.0.0
- AWS CLI configured (for AWS-related tools)
- Git

## Development Setup

```bash
# Clone the repository
git clone https://github.com/tux86/toolbox.git
cd toolbox

# Install dependencies
bun install

# Run a tool in development
bun run aws-creds
bun run ec2-ssm
bun run secrets-view
bun run proc-manager

# Run the GUI
bun run gui

# Lint all packages
bun run lint
```

## Project Structure

```
toolbox/
├── packages/
│   ├── common/        # Shared React/Ink components
│   ├── aws-creds/     # AWS SSO credentials manager
│   ├── ec2-ssm/       # EC2 SSM shell connector
│   ├── secrets-view/  # Secrets Manager browser
│   ├── proc-manager/  # Process and port manager
│   └── gui/           # Electron desktop app
├── .github/workflows/ # CI/CD pipelines
└── package.json       # Workspace root
```

## Adding a New Package

1. Create `packages/<name>/src/index.tsx`
2. Add a `package.json` with `@toolbox/<name>` as the name
3. Add a `CLAUDE.md` with tool-specific instructions
4. Run `bun install` to link the workspace
5. Add the scope to `commitlint.config.js`

See the root [CLAUDE.md](./CLAUDE.md) for the full package template.

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/). Every commit must follow this format:

```
type(scope): description
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

**Scopes:** `aws-creds`, `ec2-ssm`, `secrets-view`, `proc-manager`, `common`, `gui`, `deps`

Examples:
```bash
feat(aws-creds): add profile filtering
fix(common): handle empty clipboard on Linux
docs: update installation guide
build(deps): upgrade @aws-sdk/client-sso
```

Commits are validated by [commitlint](https://commitlint.js.org/) via a Git hook.

## Changesets

After making user-facing changes, **always add a changeset**:

```bash
bun run changeset
```

Or create one manually in `.changeset/<name>.md`:

```markdown
---
"@toolbox/ec2-ssm": patch
---

Fix instance selection when no Name tag exists
```

**Bump types:**
- `patch` — Bug fixes, minor tweaks
- `minor` — New features, enhancements
- `major` — Breaking changes

## Pull Request Process

1. Fork the repo and create a branch from `main`
2. Make your changes with conventional commits
3. Add a changeset if the change is user-facing
4. Ensure `bun run lint` passes
5. Open a PR using the provided template
6. Wait for CI to pass and a maintainer review

## Code Style

- TypeScript strict mode
- React functional components with hooks
- Shared UI components go in `@toolbox/common`
- Business logic separated from UI (see `aws-creds/src/core.ts`)
- No hardcoded credentials or secrets

## Building Binaries

```bash
# Build all
bun run build

# Build a specific tool
bun run build:aws-creds
```

Binaries are output to `dist/` as standalone executables.

## Questions?

Open an [issue](https://github.com/tux86/toolbox/issues) or start a [discussion](https://github.com/tux86/toolbox/discussions).
