/**
 * Bundles Electron main + preload from TypeScript to JavaScript,
 * and compiles the Bun RPC server to a standalone binary.
 *
 * - main: ESM (Electron supports ESM main)
 * - preload: CJS (Electron sandboxed preload requires CommonJS)
 * - server: standalone Bun binary (no runtime dependency)
 */

import { mkdir } from "fs/promises";
import path from "path";

const ROOT = path.resolve(import.meta.dir, "..");

async function build() {
  // Bundle main process (ESM)
  const main = await Bun.build({
    entrypoints: ["./electron/main.ts"],
    outdir: "./dist-electron",
    target: "node",
    format: "esm",
    external: ["electron"],
  });

  if (!main.success) {
    console.error("Failed to build main:", main.logs);
    process.exit(1);
  }

  // Bundle preload (MUST be CJS for Electron sandboxed preload)
  const preload = await Bun.build({
    entrypoints: ["./electron/preload.ts"],
    outdir: "./dist-electron",
    target: "node",
    format: "cjs",
    external: ["electron"],
  });

  if (!preload.success) {
    console.error("Failed to build preload:", preload.logs);
    process.exit(1);
  }

  console.log("Electron build OK → dist-electron/");

  // Compile Bun RPC server to standalone binary
  // Accepts optional --server-target for cross-compilation (e.g., bun-darwin-arm64)
  const targetFlag = process.argv.find((a) => a.startsWith("--server-target="));
  const target = targetFlag?.split("=")[1];

  await mkdir("./dist-server", { recursive: true });

  const ext = target?.includes("windows") || process.platform === "win32" ? ".exe" : "";
  const outfile = `./dist-server/server${ext}`;

  const args = ["build", "--compile", "./electron/server.ts", "--outfile", outfile];
  if (target) args.push(`--target=${target}`);

  const server = Bun.spawn(["bun", ...args], {
    cwd: ROOT,
    stdout: "inherit",
    stderr: "inherit",
  });

  const exitCode = await server.exited;
  if (exitCode !== 0) {
    console.error("Failed to compile server binary");
    process.exit(1);
  }

  console.log(`Server binary OK → ${outfile}`);
}

build();
