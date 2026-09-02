# dsh-workbench

English | [简体中文](README.zh-CN.md)

An experimental, independently maintained plugin workbench for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness).

## Status

This repository contains a valid Cordis plugin and an installable DeepSeek Harness bundle manifest. The plugin intentionally contributes no tools, services, events, model context, or runtime I/O while its first concrete feature remains undecided.

There is no stable release and `@geecraft23/dsh-workbench` has not been published to npm. Do not add this package to a production profile yet.

## Development baseline

- DeepSeek Harness `0.1.2-alpha.4`
- `@deepseek-ai/cordis` `^4.0.2`
- Node.js `^22.19.0 || >=24.0.0`
- pnpm `11.7.0`

DeepSeek Harness is in prerelease development. Compatibility is limited to versions exercised by this repository's tests and CI.

## Project layout

| Path | Purpose |
| --- | --- |
| [`src/index.ts`](src/index.ts) | Named Cordis plugin entry point |
| [`cordis.patch.yml`](cordis.patch.yml) | Bundle layer that mounts the package in a Harness profile |
| [`tests/`](tests) | Lifecycle, Loader composition, and bundle-manifest checks |
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | Reproducible verification on supported Node.js lines |

The package exports `name` and `apply` as named exports. It does not expose a CLI or start a Harness application; supported applications continue to launch through `dsh` profiles.

## Develop

Prerequisites: a supported Node.js version and pnpm `11.7.0`.

```sh
pnpm install --frozen-lockfile
pnpm run verify
pnpm run pack:check
```

`verify` runs linting, strict TypeScript checks, per-file coverage, the build, a built-entry smoke test, and package-publication validation. `pack:check` shows the files that would enter a package without publishing it.

The bundle metadata supports Git-host installation through the Harness plugin manager, and the `prepare` script builds TypeScript sources for that path. Source installation executes package code during installation; review the source and pin a commit before allowing its build. User installation instructions will be added only after the plugin provides useful behavior.

## Runtime and data impact

The current plugin performs no file, network, process, credential, telemetry, or persistence operations. It adds no model-visible text or tool schema and therefore has no direct token or KV-cache effect. Future changes that add any of these behaviors must document their permissions, data flow, failure behavior, lifecycle cleanup, tests, and model impact.

## Contributing and support

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Use [GitHub Issues](https://github.com/geecraft23/dsh-workbench/issues) for public bugs and feature proposals. Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md).

## License and independence

This project is available under the [MIT License](LICENSE).

`dsh-workbench` is a third-party project. It is not affiliated with, maintained by, or endorsed by DeepSeek.
