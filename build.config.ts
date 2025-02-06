// build.config.ts
import { BuildConfig } from "bun";
import { copyFile, mkdir, access } from "node:fs/promises";
import { join } from "path";

async function fileExists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(dir: string) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (error) {
    console.error(`Error creating directory ${dir}:`, error);
  }
}

async function safeCopyFile(source: string, dest: string) {
  try {
    if (await fileExists(source)) {
      await ensureDir(join(dest, ".."));
      await copyFile(source, dest);
      console.log(`Copied ${source} to ${dest}`);
    }
  } catch (error) {
    console.error(`Error copying ${source} to ${dest}:`, error);
  }
}

const config = {
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  naming: {
    entry: "[dir]/[name].[ext]",
    chunk: "chunks/[name]-[hash].[ext]",
    asset: "assets/[name]-[hash].[ext]",
  },
  minify: {
    identifiers: true,
    syntax: true,
    whitespace: true,
  },
  sourcemap: "external",
  target: "bun",
  splitting: true,
  external: ["bun", "efri"],
} satisfies BuildConfig;

async function postBuild() {
  await ensureDir("./dist");

  const filesToCopy = [
    [".env.example", "./dist/.env.example"],
    ["package.json", "./dist/package.json"],
  ];

  for (const [source, dest] of filesToCopy) {
    await safeCopyFile(source, dest);
  }

  if (await fileExists("./public")) {
    await ensureDir("./dist/public");
    console.log("Public directory copied");
  }
}

export default config;

if (import.meta.main) {
  postBuild().catch(console.error);
}
