# Contributing to dsh-workbench

Thank you for helping build this project. Keep changes small, observable, and tied to a concrete user or maintainer need.

## Before you start

Open an issue before a change that selects the plugin's first capability, adds a dependency, changes public exports, adds permissions, or changes stored/model-visible data. Small documentation and test corrections can go directly to a pull request.

Never include API keys, tokens, credentials, private prompts, user data, or machine-specific configuration in an issue, test fixture, commit, or log.

## Set up the project

Use Node.js `^22.19.0 || >=24.0.0` and pnpm `11.7.0`.

```sh
pnpm install --frozen-lockfile
pnpm run verify
pnpm run pack:check
```

Run the smallest focused test while developing, then run `pnpm run verify` once before opening or updating a pull request. Run `pnpm run pack:check` when package metadata, exports, build output, or runtime files change.

## Plugin requirements

- Keep the package a Cordis plugin with named `name`, optional `inject` and `Config`, and `apply` exports. Do not add a default export to the function-plugin module.
- Declare every consumed service in `inject`.
- Register listeners, tools, services, timers, and other resources through lifecycle-owned Cordis effects, and test cleanup after fiber disposal.
- Fail invalid self-contained configuration during plugin loading rather than silently skipping it.
- Document file, network, process, credential, persistence, telemetry, and model-visible behavior in both READMEs.
- Add focused tests for behavior, failure paths, configuration, Loader composition, and cleanup. Maintain per-file source coverage.
- Keep application launch under supported `dsh` profiles; do not add a package CLI or alternate Harness launcher.

## Pull requests

A pull request should explain the observable outcome and its limitations, link its issue when one exists, and list the exact checks run. Update code, tests, package metadata, English documentation, and Chinese documentation together when they describe the same behavior.

By contributing, you agree that your contribution is licensed under this project's MIT License.

Report security vulnerabilities through the private process in [SECURITY.md](SECURITY.md), not a public issue.
