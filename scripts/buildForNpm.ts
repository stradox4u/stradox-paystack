import { build, emptyDir } from "@deno/dnt";

await emptyDir("../npm");

try {
  await build({
    entryPoints: ["./src/main.ts"],
    outDir: "./npm",
    shims: {
      deno: true,
    },
    test: false,
    typeCheck: "both",
    package: {
      name: "@stradox/paystack",
      description: "A Paystack API wrapper, written in TypeScript",
      version: Deno.args[0],
      license: "MIT",
      repository: {
        type: "git",
        url: "git+https://github.com/stradox4u/stradox-paystack.git"
      },
      bugs: {
        url: "https://github.com/stradox4u/stradox-paystack/issues"
      }
    },
    postBuild() {
      Deno.copyFileSync("./README.npm.md", "./npm/README.md");
    },
  });
} catch (error) {
  console.error(error);
}