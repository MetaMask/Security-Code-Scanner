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


We recommend setting up an organization or repository secret to pass in the `mixpanel_project_token` and `slack_webhook`. This ensures they are not disclosed in the source code.

## How to Use

To use the Security Code Scanner, add the following steps to your workflow file:

```yaml
name: MetaMask Security Code Scanner

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
        uses: MetaMask/Security-Code-Scanner@main
        with:
          repo: ${{ github.repository }}
          paths_ignored: ${{ github.event.inputs.paths_ignored || env.DEFAULT_PATHS_IGNORED }}
          rules_excluded: ${{ github.event.inputs.rules_excluded || env.DEFAULT_RULES_EXCLUDED }}
          mixpanel_project_token: ${{secrets.<YOUR TOKEN SECRET NAME>}}
          slack_webhook: ${{secrets.<YOUR WEBHOOK SECRET NAME>}}
```

## Features

- **CodeQL Analysis**: Leverages [MetaMask/Appsec-CodeQL](https://github.com/MetaMask/codeql-action), a wrapper around GitHub's CodeQL](https://codeql.github.com/) to identify vulnerabilities in the codebase.

## Future Plans

The action is in its initial phase, and we plan to integrate additional security scanning tools to widen our security coverage.

## Disclaimer

This action is developed for the MetaMask engineering team, and may require additional configuration if used in other organizations.
