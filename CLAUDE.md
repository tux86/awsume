# CLAUDE.md

## Project Overview

**Awsume** — Interactive AWS credential manager with CLI and desktop app, built with Bun + React + Ink.

## Structure

```
awsume/
├── packages/
│   ├── core/       # @awsume/core - Shared components + credential logic
│   ├── cli/        # @awsume/cli  - Terminal UI (React/Ink)
│   └── gui/        # @awsume/gui  - Electron desktop app
├── dist/           # Compiled binary (after build)
└── package.json    # Workspace root
```

## Tech Stack

| Tool | Purpose |
|------|---------|
| Bun | Runtime & package manager |
| TypeScript | Language |
| React | Component framework |
| Ink | React renderer for CLI |
| Electron | Desktop app framework |
| Tailwind CSS | GUI styling |
| ESLint | Linting (flat config) |

## Commands

```bash
bun install           # Install dependencies
bun run cli           # Run CLI
bun run gui           # Run desktop app (dev)
bun run build         # Build CLI binary to dist/awsume
bun run lint          # Run ESLint on all packages
```

## Commits & Releases

### Conventional Commits (enforced by commitlint)

```bash
feat(cli): add profile filtering      # New feature
fix(core): handle empty clipboard      # Bug fix
docs: update README                    # Documentation
build(deps): upgrade aws-sdk           # Dependencies
```

**Allowed scopes:** `core`, `cli`, `gui`, `deps`

### Changesets

After user-facing changes, always add a changeset:

```bash
bun run changeset
```

## Packages

| Package | Description |
|---------|-------------|
| [@awsume/core](packages/core/) | React/Ink components, hooks, AWS utils, credential logic |
| [@awsume/cli](packages/cli/) | Terminal UI for credential management |
| [@awsume/gui](packages/gui/) | Electron desktop app |

## Shared Exports (@awsume/core)

```tsx
import {
  // Layout
  App, renderApp, Card, Divider,
  // Interactive
  List, MultiSelectList, ActionBar, ACTIONS,
  // Feedback
  Spinner, StatusMessage, CopyFeedback,
  // AWS
  IdentityCard, useIdentity, useCopy,
  getAwsClientConfig, copyToClipboard, formatJson,
  // Credential Logic
  discoverProfiles, checkTokenStatus, refreshProfile,
  startDeviceAuthorization, performSSOLoginFlow,
  loadSettings, saveSettings, formatExpiry,
  type SSOProfile, type AppSettings,
} from "@awsume/core";
```
