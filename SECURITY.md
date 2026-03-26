# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Do not open a public issue.** Instead, email the maintainers or use [GitHub's private vulnerability reporting](https://github.com/tux86/toolbox/security/advisories/new).

We will acknowledge your report within 48 hours and aim to provide a fix within 7 days for critical issues.

## Scope

This policy applies to all packages in the Toolbox monorepo:

- `@toolbox/common`
- `@toolbox/aws-creds`
- `@toolbox/ec2-ssm`
- `@toolbox/secrets-view`
- `@toolbox/proc-manager`
- `@toolbox/gui`

## Best Practices

- Never commit AWS credentials, tokens, or secrets
- Use AWS SSO for authentication (which is what this toolbox facilitates)
- Keep dependencies up to date
