# Node migration and npm 1.0.0 release

Target: `@stradox/paystack@1.0.0`. Preserve the public API and both ESM and
CommonJS support. Pause JSR publishing; keep existing JSR releases available.

- [x] Confirm npm history: published versions `0.3.2` and `0.3.32`; latest
      `0.3.32` exposes both ESM and CommonJS.
- [x] Add root npm metadata, lockfile, and Node development tooling.
- [x] Build ESM, CommonJS, and matching TypeScript declarations from `src/`.
- [x] Port all offline tests to Vitest, using dummy credentials and fetch mocks.
- [x] Separate live Paystack tests behind an explicit integration command.
- [x] Pass formatting, lint, type checks, offline tests, and build validation.
- [x] Smoke-test the packed npm archive in JavaScript and TypeScript consumers,
      covering ESM and CommonJS.
- [x] Replace Deno CI and JSR publishing with Node CI and tag-based npm publishing.
- [x] Update installation, contribution, and 1.0.0 migration/release guidance.
- [x] Remove obsolete tracked Deno configuration; preserve unrelated local work.
- [ ] Verify npm maintainer access and configure the npm trusted publisher.
- [ ] Publish a 1.0.0 prerelease under `next` and verify installation.
- [ ] Publish 1.0.0, verify `latest`, and create release notes.

## Validation (2026-10-22)

- Branch: `migration/node-npm-1.0.0`.
- Node.js 24.22.1: `npm run check` passed, including all 130 existing offline
  cases and eight new integration-environment/fixture checks.
- `npm run test:package` passed JavaScript ESM/CommonJS and TypeScript
  NodeNext/Bundler consumers with no runtime dependencies or Paystack requests.
- Dependency installation audit: zero known vulnerabilities.
- Integration command rejected missing opt-in before starting the live suite.
- User-run live suite: 90 passed, four failed. Three failures were outdated
  expected Paystack error messages (dispute, refund, authorization); their
  assertions now pass when replaying the reported responses offline.
- With explicit approval, reran only customer creation and validation: creation
  passed; validation returned "This BVN has been used by too many customers for
  your integration." The case reused one hardcoded BVN against fresh customers.
- Customer validation now requires an optional persistent customer/BVN fixture
  from `.env.example`, preserving the success assertion when configured. It is
  visibly skipped when the fixture is absent; partial configuration fails.
- Offline replay of the four affected cases plus customer setup passes with a
  persistent fixture. Full live-suite verification of the changes is pending.
- Integration command arguments are forwarded so individual files can be run.
- Release-tag validation accepted `v1.0.0`; `git diff --check` passed.
- Node 22/24/26 CI is configured; remote workflow runs are pending.
- Existing local `.gitignore` change retained; ignored generated `npm/` and
  local credentials were not removed.

## External release steps still pending

- `npm whoami` returned HTTP 401. Maintainer authentication/access remains
  unverified, and the npm trusted publisher must be configured or confirmed
  as described in [RELEASE.md](RELEASE.md).
- Migration changes are prepared on `migration/node-npm-1.0.0` for review.
  Merging, release tags, and npm publication remain pending.
- The manifest is prepared as `1.0.0`; follow `RELEASE.md` to publish an RC under
  `next` before the stable release. Mark publication steps complete only after
  the registry confirms them.
