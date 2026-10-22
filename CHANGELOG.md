# Changelog

## 1.0.0 (unreleased)

- Move development, tests, and releases from Deno to Node.js and npm.
- Require Node.js 22 or newer; use Node.js 24 for development.
- Preserve `Paystack`, `getPaystack`, resource methods, and ESM/CommonJS support.
- Ship matching declarations for ESM and CommonJS consumers.
- Run offline unit tests by default; require explicit opt-in for live Paystack
  test-mode integration tests.
- Validate the packed archive in JavaScript and TypeScript consumer projects.
- Publish version tags to npm using OIDC trusted publishing; pause JSR releases.

### Upgrading from 0.3.32 or JSR

Install `@stradox/paystack` directly from npm and use Node.js 22+. Existing npm
imports and `require` calls remain valid. JSR users should remove their previous
dependency entry or alias before installing from npm. No HTTP behavior changes
are intended in this release.
