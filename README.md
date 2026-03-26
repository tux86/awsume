# Awsume

Interactive AWS credential manager with CLI and desktop app.

[![CI](https://github.com/tux86/awsume/actions/workflows/ci.yml/badge.svg)](https://github.com/tux86/awsume/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<p align="center">
  <img src="demo.gif" alt="Awsume Demo" width="560">
</p>

---

## Features

- **Auto-discovery** - Scans `~/.aws/config` for SSO profiles (legacy and sso_session)
- **Status dashboard** - View credential validity with expiry countdown
- **Multi-select refresh** - Refresh multiple profiles at once with SSO device auth
- **Auto-refresh daemon** - Background process to keep credentials fresh
- **Desktop notifications** - Alerts when credentials expire (macOS/Linux)
- **Settings** - Configurable intervals, favorite profiles, notification preferences
- **Two interfaces** - Terminal UI (React/Ink) and desktop app (Electron)

## Prerequisites

- [Bun](https://bun.sh) >= 1.0 (recommended: 1.3.11)
- [AWS CLI v2](https://aws.amazon.com/cli/) configured with SSO profiles in `~/.aws/config`

## Getting Started

```bash
git clone https://github.com/tux86/awsume.git
cd awsume
bun install

# Run the CLI
bun run cli

# Run the desktop app
bun run gui
```

## Building

```bash
# Build CLI binary
bun run build

# Output: dist/awsume (~61 MB standalone)
```

### Global Installation

```bash
ln -s $(pwd)/dist/awsume ~/.local/bin/awsume
```

## Project Structure

```
awsume/
├── packages/
│   ├── core/       # Shared UI components + credential logic
│   ├── cli/        # Terminal UI (React/Ink)
│   └── gui/        # Desktop app (Electron + React + Tailwind)
├── .github/        # CI/CD workflows and templates
├── .changeset/     # Version management
└── dist/           # Compiled binary (after build)
```

## Packages

| Package | Description |
|---------|-------------|
| `@awsume/core` | Shared React/Ink components, hooks, and AWS credential business logic |
| `@awsume/cli` | Interactive terminal UI |
| `@awsume/gui` | Electron desktop app |

## Keyboard Shortcuts (CLI)

| Key | Action |
|-----|--------|
| `↑/↓` or `j/k` | Navigate |
| `Enter` | Select |
| `Space` | Toggle selection |
| `a` | Select all / none |
| `r` | Refresh |
| `c` | Copy URL |
| `b` / `Escape` | Back |
| `q` | Quit |

## Contributing

- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)

Uses [Conventional Commits](https://www.conventionalcommits.org/) and [Changesets](https://github.com/changesets/changesets).

## License

[MIT](LICENSE)

---

<p align="center">
  Made with &#10084; by <a href="https://github.com/tux86">tux86</a>
</p>
