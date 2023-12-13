# Security Code Scanner

## Overview

The Security Code Scanner GitHub Action is designed to enhance the security of your repositories by
performing thorough code scans. Currently, it utilizes the Appsec CodeQL scanner,
but the scope is planned to expand to include other security actions,
providing a more comprehensive security analysis.

## Inputs

- **`repo`**: (Required) The name of the repository you want to scan.

## Secrets

This action requires secret to be be defined in organization or repo secrets:

- MIXPANEL_PROJECT_TOKEN

## How to Use

To use the Security Code Scanner, add the following steps to your workflow file:

```yaml
name: Security Scan

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repo to scan
        uses: actions/checkout@v4
        with:
          repository: ${{ github.repository }}

      - name: Security Code Scanner
        uses: <your-username>/Security-Code-Scanner@v1
        with:
          repo: ${{ github.repository }}
```

Replace `<your-username>` with your GitHub username or organization name where the action is hosted.

## Features

- **CodeQL Analysis**: Leverages the robust CodeQL scanning tool from MetaMask/Appsec-CodeQL to identify vulnerabilities in the codebase.

## Future Plans

The action is in its initial phase, and we plan to integrate additional security scanning tools to widen our security coverage.
