import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/tests/unit/**/*.test.ts"],
    setupFiles: ["src/tests/setup-unit.ts"],
    restoreMocks: true,
    allowOnly: false,
  },
});
