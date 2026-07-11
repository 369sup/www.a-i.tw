# Security policy

## Reporting a vulnerability

Do not open a public issue for a suspected vulnerability. Contact the repository
owner privately through the GitHub account that owns this repository, including
affected paths, reproduction steps, impact, and any suggested mitigation.

## Supported baseline

Security fixes are applied to the current `main` branch. Pull requests run the
repository CI, Semgrep, and CodeQL workflows; scheduled security checks provide
additional coverage between changes.

## Sensitive data

Never commit credentials, API keys, private keys, or production data. Local
environment files and Codex connection settings are intentionally ignored.
