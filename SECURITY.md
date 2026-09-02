# Security Policy

## Supported versions

This project has no stable release. Security fixes apply to the latest `main` branch; no older commit or package version currently receives support.

## Report a vulnerability

Do not open a public issue for a suspected vulnerability. Use GitHub's [private vulnerability report](https://github.com/geecraft23/dsh-workbench/security/advisories/new).

Include the affected commit or version, impact, prerequisites, reproduction steps, and a minimal proof of concept when safe. Remove credentials, private data, and unrelated system information. If the report concerns a dependency, identify the package and affected version.

The maintainer will assess reports and coordinate disclosure in good faith. This project does not promise a fixed response or remediation time.

## Security-sensitive changes

Changes involving files, subprocesses, networks, credentials, persistence, model-visible data, installation scripts, or new dependencies require explicit documentation and focused tests. The current plugin performs none of those runtime operations; its `prepare` script does execute the local TypeScript compiler during source installation.
