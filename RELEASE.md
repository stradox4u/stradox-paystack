# npm releases

Use Node.js 24 and npm 11.5.1 or newer. The target stable release is `1.0.0`;
the previous npm `latest` version is `0.3.32`.

## One-time npm setup

1. Verify maintainer access with `npm whoami` and
   `npm access list packages` (never copy tokens into this repository).
2. In the existing package's npm settings, add a GitHub Actions trusted publisher:
   - Owner: `stradox4u`
   - Repository: `stradox-paystack`
   - Workflow filename: `publish.yml`
   - Allow direct package publishing. No GitHub environment is configured.
3. Confirm the repository is public if npm provenance is required. Trusted
   publishing works without a long-lived `NPM_TOKEN`.

Reference: <https://docs.npmjs.com/trusted-publishers/>

## Prepare and validate

```bash
npm ci
npm run check
npm run test:package
```

The package check builds and packs into a temporary directory, installs the
archive offline, checks its contents, and verifies JavaScript ESM/CommonJS plus
TypeScript NodeNext/Bundler consumers. It makes no Paystack requests.

Run integration tests separately with test-mode credentials when needed; they
are not part of the release workflow. Complete `RELEASE_CHECKLIST.md` with actual
results and retain any outstanding account-specific validation.

## Prerelease, then stable

1. For a candidate, set the version to `1.0.0-rc.1` using
   `npm version 1.0.0-rc.1 --no-git-tag-version`. Commit the manifest and lockfile
   together, run the checks, and merge through the normal review process.
2. Tag that commit on `main` as `v1.0.0-rc.1` and push the tag. The release
   workflow publishes prereleases under `next`.
3. Verify `npm view @stradox/paystack@next version` and install
   `npm install @stradox/paystack@next` in a representative application.
4. Set the stable version to `1.0.0` with `npm version 1.0.0 --no-git-tag-version`,
   finalize the changelog date and checklist, rerun checks, and merge.
5. Tag that reviewed commit as `v1.0.0` and push the tag. Stable releases publish
   under `latest`.
6. Verify `npm view @stradox/paystack@latest version`, install it in a fresh
   application, and create GitHub release notes from `CHANGELOG.md`.

Tags must match the manifest and point to a commit contained in `main`. The
workflow checks, builds, packs, and tests the archive before publishing that
exact archive. The archive is also retained as a workflow artifact. Existing
JSR versions remain available; no new JSR publication is configured.

## If verification fails after publication

Do not overwrite or unpublish a released version. Fix forward in a new patch.
If necessary, a maintainer can temporarily move `latest` back to a known-good
version with `npm dist-tag add @stradox/paystack@0.3.32 latest`. Dist-tag changes
are separate registry operations and require appropriate account permissions.
