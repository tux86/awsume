/**
 * @awsume/core - Shared UI components, hooks, and AWS credential logic
 */

// ─────────────────────────────────────────────────────────────────────────────
// React/Ink Components
// ─────────────────────────────────────────────────────────────────────────────

export {
  // Layout
  App,
  renderApp,
  Header,
  Card,
  Divider,
  // Interactive
  List,
  MultiSelectList,
  ActionBar,
  ACTIONS,
  // Feedback
  Spinner,
  StatusMessage,
  CopyFeedback,
  // AWS
  IdentityCard,
  // Types
  type AppProps,
  type HeaderProps,
  type CardProps,
  type DividerProps,
  type ListProps,
  type ListItemData,
  type ListAction,
  type MultiSelectListProps,
  type MultiSelectItemData,
  type ActionBarProps,
  type ActionItem,
  type SpinnerProps,
  type StatusMessageProps,
  type StatusType,
  type CopyFeedbackProps,
  type IdentityCardProps,
} from "./components/index.js";

// ─────────────────────────────────────────────────────────────────────────────
// React Hooks
// ─────────────────────────────────────────────────────────────────────────────

export {
  useIdentity,
  useCopy,
  type AwsIdentity,
  type UseIdentityResult,
  type UseCopyResult,
} from "./hooks/index.js";

// ─────────────────────────────────────────────────────────────────────────────
// AWS Utilities
// ─────────────────────────────────────────────────────────────────────────────

export {
  getAwsEnv,
  getAwsClientConfig,
  getCallerIdentity,
  parseIdentityArn,
  type CallerIdentity,
  type AwsEnv,
} from "./aws.js";

// ─────────────────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────────────────

export { copyToClipboard, formatJson } from "./utils.js";

// ─────────────────────────────────────────────────────────────────────────────
// AWS Credentials Manager (business logic)
// ─────────────────────────────────────────────────────────────────────────────

export {
  // Types
  type SSOProfile,
  type CredentialStatus,
  type ProfileStatus,
  type AWSCredentials,
  type DeviceAuthInfo,
  type AppSettings,
  type TokenInfo,
  // Constants
  HOME,
  AWS_DIR,
  CONFIG_PATH,
  CREDENTIALS_PATH,
  SSO_CACHE_DIR,
  SETTINGS_PATH,
  // Constants
  DEFAULT_SETTINGS,
  REFRESH_INTERVALS,
  // Functions
  parseIniFile,
  writeCredentials,
  discoverProfiles,
  checkTokenStatus,
  checkAllProfiles,
  refreshProfile,
  startDeviceAuthorization,
  saveSSOTokenToCache,
  pollForToken,
  performSSOLoginFlow,
  getCredentialsWithToken,
  loadSettings,
  saveSettings,
  sendNotification,
  openBrowser,
  formatExpiry,
  getStatusColor,
  sortByFavorites,
  findCachedToken,
} from "./aws-creds.js";
