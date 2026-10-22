import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { validateIntegrationEnv } from "../src/tests/integration-env.ts";

validateIntegrationEnv(process.env);

const result = spawnSync(
  process.execPath,
  [
    fileURLToPath(
      new URL("../node_modules/vitest/vitest.mjs", import.meta.url),
    ),
    "run",
    "--config",
    "vitest.integration.config.ts",
    ...process.argv.slice(2),
  ],
  { stdio: "inherit", env: process.env },
);
if (result.error) throw result.error;
process.exit(result.status ?? 1);
