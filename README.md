# Security Code Scanner

## Overview

The Security Code Scanner GitHub Action is designed to enhance the security of your repositories by
performing thorough code scans. Currently, it utilizes the Appsec CodeQL scanner,
but the scope is planned to expand to include other security actions,
providing a more comprehensive security analysis.

## Inputs

- **`repo`**: (Required) The name of the repository you want to scan.
- **`mixpanel_project_token`**: (Required) Token belonging to a mixpanel project that is used to track build passes & failures.
- **`slack_webhook`**: (Required) Slack webhook URL.

- **`paths_ignored`**: (optional) Code paths which are to be ignored.
- **`rules_excluded`**: (optional) Code scanning rules to exclude.

## Secrets

This action requires secret to be be defined in organization or repo secrets:

- SECURITY_CODE_SCANNER_MIXPANEL_TOKEN
- APPSEC_BOT_SLACK_WEBHOOK

## How to Use

To use the Security Code Scanner, add the following steps to your workflow file:

```yaml
name: "MetaMask Security Code Scanner"

on:
  push:
    branches: [ 'main' ]
  pull_request:
    branches: [ 'main' ]
  
jobs:
  run-security-scan:
    runs-on: ubuntu-latest
    permissions:
      actions: read
      contents: read
      security-events: write
    steps:   
      - name: MetaMask Security Code Scanner
        uses: MetaMask/Security-Code-Scanner@main
        with:
          repo: ${{ github.repository }}
          paths_ignored: ['test/']
          rules_excluded: ['js/foobar']
          mixpanel_project_token: ${{secrets.SECURITY_CODE_SCANNER_MIXPANEL_TOKEN}}
          slack_webhook: ${{ secrets.APPSEC_BOT_SLACK_WEBHOOK }}
```

## Features

- **CodeQL Analysis**: Leverages [MetaMask/Appsec-CodeQL](https://github.com/MetaMask/codeql-action), a wrapper around GitHub's CodeQL](https://codeql.github.com/) to identify vulnerabilities in the codebase.

## Future Plans

The action is in its initial phase, and we plan to integrate additional security scanning tools to widen our security coverage.

## Disclaimer

This action is developed for the MetaMask engineering team, and may require additional configuration if used in other organizations.
