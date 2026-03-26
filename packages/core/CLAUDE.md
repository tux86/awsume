# @awsume/core

Shared UI components, hooks, AWS utilities, and credential management logic for Awsume.

## Architecture

```
src/
├── index.ts              # Re-exports all modules
├── aws.ts                # AWS SDK utilities (STS, config)
├── aws-creds.ts          # SSO credential business logic (UI-agnostic)
├── utils.ts              # General utilities (clipboard, JSON)
├── components/
│   ├── App.tsx           # Main app wrapper with header + action bar
│   ├── Header.tsx        # App header
│   ├── Card.tsx          # Bordered card container
│   ├── Divider.tsx       # Horizontal divider
│   ├── List.tsx          # Interactive scrollable list
│   ├── MultiSelectList.tsx # Multi-select with checkboxes
│   ├── ActionBar.tsx     # Keyboard shortcut hints
│   ├── Spinner.tsx       # Loading indicator
│   ├── StatusMessage.tsx # Success/error/warning messages
│   ├── CopyFeedback.tsx  # Copy confirmation
│   └── IdentityCard.tsx  # AWS identity display
└── hooks/
    ├── useIdentity.tsx   # AWS caller identity hook
    └── useCopy.tsx       # Clipboard with feedback hook
```

## Key Exports

### UI Components
`App`, `renderApp`, `Header`, `Card`, `Divider`, `List`, `MultiSelectList`, `ActionBar`, `ACTIONS`, `Spinner`, `StatusMessage`, `CopyFeedback`, `IdentityCard`

### Hooks
`useIdentity`, `useCopy`

### AWS Utilities
`getAwsEnv`, `getAwsClientConfig`, `getCallerIdentity`, `parseIdentityArn`

### Credential Logic (aws-creds.ts)
`discoverProfiles`, `checkTokenStatus`, `checkAllProfiles`, `refreshProfile`, `startDeviceAuthorization`, `performSSOLoginFlow`, `loadSettings`, `saveSettings`, `sendNotification`, `formatExpiry`, `getStatusColor`, `sortByFavorites`

### General Utilities
`copyToClipboard`, `formatJson`
