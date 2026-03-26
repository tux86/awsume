# @awsume/cli

Interactive terminal UI for managing AWS SSO credentials. Built with React/Ink.

## Quick Start

```bash
bun run start
# or after build:
./dist/awsume
```

## Features

- Auto-discovers SSO profiles from `~/.aws/config`
- Status dashboard with expiry countdown
- Multi-select credential refresh with SSO device auth flow
- Auto-refresh daemon mode with configurable intervals
- Desktop notifications on expiry (macOS/Linux)
- Settings: notifications, default interval, favorite profiles

## Architecture

Single-file React/Ink application (`src/index.tsx`). All business logic lives in `@awsume/core`.

### Views

| View | Description |
|------|-------------|
| menu | Main menu |
| status | Profile status table |
| refresh-select | Multi-select profiles to refresh |
| refresh | Refresh progress with SSO login prompts |
| daemon-select | Select profiles for daemon |
| daemon-interval | Select refresh interval |
| daemon-running | Running daemon with countdown |
| settings | Settings menu |

### Hooks (local)

- `useProfiles()` — Profile discovery and status checking
- `useSettings()` — Settings management
- `useDeviceAuth()` — SSO device auth flow state

## Keyboard Shortcuts

- `↑/↓` Navigate, `Enter` Select, `q` Quit
- `Space` Toggle selection, `a` Select all/none
- `Enter` Open browser (SSO login), `c` Copy URL
