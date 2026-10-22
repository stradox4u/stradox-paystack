import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { version } = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);
assert.equal(
  process.env.RELEASE_TAG,
  `v${version}`,
  "Release tag must match package.json version",
);
console.log(`dist-tag=${version.includes("-") ? "next" : "latest"}`);
