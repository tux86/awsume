# Toolbox

A collection of interactive CLI tools and a desktop app for AWS workflows, built with **Bun**, **React**, and **Ink**.

[![CI](https://github.com/tux86/toolbox/actions/workflows/ci.yml/badge.svg)](https://github.com/tux86/toolbox/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Changesets](https://img.shields.io/badge/Changesets-enabled-blue)](https://github.com/changesets/changesets)

<p align="center">
  <img src="demo.gif" alt="Toolbox Demo" width="560">
</p>

---

## Table of Contents

- [Overview](#overview)
- [Tools](#tools)
- [GUI Desktop App](#gui-desktop-app)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Building](#building)
- [Project Structure](#project-structure)
- [Shared Components](#shared-components)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Toolbox is a Bun workspace monorepo containing:

- **4 CLI tools** with modern terminal UIs (React + Ink)
- **1 desktop app** (Electron + React + Tailwind)
- **1 shared component library** (`@toolbox/common`)

All tools compile to standalone binaries (~60 MB) with zero runtime dependencies.

---

## Tools

### aws-creds

**AWS Credentials Manager** - Interactive credential management for AWS SSO.

- Auto-discovers SSO profiles from `~/.aws/config`
- Status dashboard with expiry countdown
- Multi-select credential refresh with SSO device auth flow
- Auto-refresh daemon mode
- Desktop notifications on expiry (macOS/Linux)
- UI-agnostic core module (`core.ts`) shared with the GUI app

```bash
bun run aws-creds
```

### ec2-ssm

**EC2 SSM Shell** - Connect to EC2 instances via AWS Systems Manager.

- Lists running instances with SSM agent status
- Shows instance name, ID, private IP, and type
- Direct shell access without SSH keys (uses SSM Session Manager)

```bash
AWS_PROFILE=my-profile bun run ec2-ssm
```

### secrets-view

**Secrets Manager Browser** - Browse and copy AWS Secrets Manager secrets.

- Lists all secrets in the current region
- JSON pretty-printing for secret values
- Copy to clipboard with visual feedback

```bash
AWS_PROFILE=my-profile bun run secrets-view
```

### proc-manager

**Process Manager** - Interactive process and port management.

- Combined view: processes with CPU%, memory, user, and listening ports
- Dedicated ports view for all listening TCP connections
- Kill options: SIGTERM (graceful) or SIGKILL (force)
- Auto-refresh and filter support

```bash
bun run proc-manager
```

---

## GUI Desktop App

An Electron desktop application for managing AWS SSO credentials with a native macOS look and feel.

- Dark theme with Tailwind CSS
- Dashboard with profile status overview
- Multi-select credential refresh
- Auto-refresh daemon configuration
- Settings management (notifications, intervals, favorites)
- Shares the `@toolbox/aws-creds` core module for all AWS operations

```bash
bun run gui
```

---

## Prerequisites

- [Bun](https://bun.sh) >= 1.0 (recommended: 1.3.11)
- [AWS CLI v2](https://aws.amazon.com/cli/) with [Session Manager plugin](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html) (for AWS tools)
- Valid AWS credentials configured via `~/.aws/config`

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/tux86/toolbox.git
cd toolbox

# Install dependencies
bun install

# Run any tool
bun run aws-creds
bun run ec2-ssm
bun run secrets-view
bun run proc-manager
bun run gui
```

---

## Building

### CLI Binaries

```bash
# Build all CLI tools
bun run build

# Build individually
bun run build:aws-creds
bun run build:ec2-ssm
bun run build:secrets-view
bun run build:proc-manager
```

Binaries are output to `dist/`:

```
dist/
├── aws-creds       ~61 MB
├── ec2-ssm         ~62 MB
├── secrets-view    ~61 MB
└── proc-manager    ~60 MB
```

### Global Installation (optional)

```bash
ln -s $(pwd)/dist/aws-creds ~/.local/bin/aws-creds
ln -s $(pwd)/dist/ec2-ssm ~/.local/bin/ec2-ssm
ln -s $(pwd)/dist/secrets-view ~/.local/bin/secrets-view
ln -s $(pwd)/dist/proc-manager ~/.local/bin/proc-manager
```

---

## Project Structure

```
toolbox/
├── packages/
│   ├── common/          # Shared React/Ink component library
│   ├── aws-creds/       # AWS SSO credentials manager (CLI + core module)
│   ├── ec2-ssm/         # EC2 SSM shell connector
│   ├── secrets-view/    # Secrets Manager browser
│   ├── proc-manager/    # Process and port manager
│   └── gui/             # Electron desktop app
├── .github/
│   ├── workflows/       # CI and release pipelines
│   └── ISSUE_TEMPLATE/  # Bug report and feature request templates
├── dist/                # Compiled binaries (after build)
├── .changeset/          # Changeset configuration
└── package.json         # Workspace root
```

---

## Shared Components

All CLI tools are built on `@toolbox/common`, a shared React/Ink component library:

| Category | Exports |
|----------|---------|
| **Layout** | `App`, `renderApp`, `Header`, `Card`, `Divider` |
| **Interactive** | `List`, `MultiSelectList`, `ActionBar`, `ACTIONS` |
| **Feedback** | `Spinner`, `StatusMessage`, `CopyFeedback` |
| **AWS** | `IdentityCard`, `useIdentity`, `getAwsEnv`, `getAwsClientConfig`, `getCallerIdentity`, `parseIdentityArn` |
| **Utilities** | `useCopy`, `copyToClipboard`, `formatJson` |

---

## Keyboard Shortcuts

All CLI tools share these common shortcuts:

| Key | Action |
|-----|--------|
| `↑/↓` or `j/k` | Navigate |
| `Enter` | Select |
| `r` | Refresh |
| `b` or `Escape` | Back |
| `c` | Copy |
| `q` | Quit |

Multi-select lists add:

| Key | Action |
|-----|--------|
| `Space` | Toggle selection |
| `a` | Select all / none |
| `Enter` | Submit |

---

## Contributing

We welcome contributions! Please read the following before getting started:

- [Contributing Guide](CONTRIBUTING.md) - Development setup, commit conventions, and PR process
- [Code of Conduct](CODE_OF_CONDUCT.md) - Community standards
- [Security Policy](SECURITY.md) - Reporting vulnerabilities

This project uses [Conventional Commits](https://www.conventionalcommits.org/) (enforced by commitlint) and [Changesets](https://github.com/changesets/changesets) for versioning and releases.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Made with &#10084; by <a href="https://github.com/tux86">tux86</a>
</p>
