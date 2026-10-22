import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/main.ts"],
  format: ["esm", "cjs"],
  platform: "node",
  target: "node22",
  dts: true,
  clean: true,
  sourcemap: true,
});
