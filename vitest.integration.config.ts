import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/tests/feature/**/*.test.ts"],
    setupFiles: ["src/tests/setup-integration.ts"],
    fileParallelism: false,
    sequence: { concurrent: false },
    testTimeout: 30000,
    allowOnly: false,
  },
});
