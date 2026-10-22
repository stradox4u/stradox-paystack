import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  cpSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const npmCli = process.env.npm_execpath;
assert(npmCli, "Run this check through npm run test:package");
assert(process.argv.length <= 3, "Pass at most one package archive");
const temporary = mkdtempSync(join(tmpdir(), "paystack-package-"));
const env = { ...process.env, npm_config_cache: join(temporary, "npm-cache") };

function npm(args, cwd = root) {
  return execFileSync(process.execPath, [npmCli, ...args], {
    cwd,
    env,
    encoding: "utf8",
  });
}

try {
  let archive;
  if (process.argv[2]) {
    archive = resolve(process.argv[2]);
  } else {
    process.stdout.write(npm(["run", "build"]));
    const [packed] = JSON.parse(
      npm([
        "pack",
        "--ignore-scripts",
        "--json",
        "--pack-destination",
        temporary,
      ]),
    );
    archive = join(temporary, packed.filename);
  }

  const manifest = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  writeFileSync(
    join(temporary, "package.json"),
    JSON.stringify({
      name: "paystack-consumer-check",
      private: true,
      type: "module",
    }),
  );
  npm(
    [
      "install",
      archive,
      "--offline",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
      "--package-lock=false",
    ],
    temporary,
  );
  const installedRoot = join(temporary, "node_modules", "@stradox", "paystack");
  const installed = JSON.parse(
    readFileSync(join(installedRoot, "package.json"), "utf8"),
  );
  assert.equal(installed.name, manifest.name);
  assert.equal(installed.version, manifest.version);
  assert.deepEqual(installed.dependencies ?? {}, {});
  const files = execFileSync("tar", ["-tzf", archive], { encoding: "utf8" })
    .trim()
    .split("\n");
  assert(
    files.every((file) =>
      /^package\/(?:dist\/|package\.json$|README\.md$|LICENSE$|CHANGELOG\.md$)/.test(
        file,
      ),
    ),
    "Unexpected file in npm archive",
  );
  for (const relative of ["main.mjs", "main.cjs", "main.d.mts", "main.d.cts"])
    readFileSync(join(installedRoot, "dist", relative));
  cpSync(new URL("./fixtures/", import.meta.url), join(temporary, "fixtures"), {
    recursive: true,
  });
  for (const fixture of ["consumer.mjs", "consumer.cjs"])
    execFileSync(process.execPath, [join("fixtures", fixture)], {
      cwd: temporary,
      stdio: "inherit",
    });
  const tsc = join(root, "node_modules", "typescript", "bin", "tsc");
  for (const [module, moduleResolution, include] of [
    ["NodeNext", "NodeNext", ["consumer.mts", "consumer.cts"]],
    ["ESNext", "Bundler", ["consumer.mts"]],
  ]) {
    writeFileSync(
      join(temporary, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          lib: ["ES2022"],
          module,
          moduleResolution,
          strict: true,
          noEmit: true,
          types: [],
          skipLibCheck: false,
        },
        include: include.map((file) => `fixtures/${file}`),
      }),
    );
    execFileSync(process.execPath, [tsc, "-p", temporary], {
      cwd: temporary,
      stdio: "inherit",
    });
  }
  const publishReport = JSON.parse(
    npm([
      "publish",
      process.argv[2] ?? archive,
      "--dry-run",
      "--ignore-scripts",
      "--offline",
      "--json",
      "--access",
      "public",
      "--tag",
      "next",
    ]),
  );
  const publication = publishReport[manifest.name] ?? publishReport;
  assert.equal(publication.name, manifest.name);
  assert.equal(publication.version, manifest.version);
  console.log(
    `Packed ${manifest.name}@${manifest.version}: ESM, CommonJS, TypeScript consumers, and publish dry-run passed.`,
  );
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
