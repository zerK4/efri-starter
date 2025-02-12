import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import fs from "fs";
import checker from "vite-plugin-checker";
import { copy } from "fs-extra"; // Install fs-extra for easier file copying

// Function to collect all TypeScript files (excluding entry)
function getAllTsFiles(dir: string, exclude: string[] = []): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (exclude.includes(fullPath)) return [];
    return entry.isDirectory()
      ? getAllTsFiles(fullPath, exclude)
      : fullPath.endsWith(".ts")
        ? [fullPath]
        : [];
  });
}

const publicDir = path.resolve(__dirname, "public"); // Define the public directory
const srcDir = path.resolve(__dirname, "src");
const routeFiles = getAllTsFiles(path.join(srcDir, "routes"));
const pluginFiles = getAllTsFiles(path.join(srcDir, "plugins/routes"));

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    checker({ typescript: true }), // Enable TypeScript type checking
    {
      // Custom plugin to copy public folder to dist/public
      name: "copy-public-folder",
      closeBundle: async () => {
        const distPublicDir = path.resolve(__dirname, "dist/public");
        await copy(publicDir, distPublicDir); // Copy public folder to dist/public
        console.log("Public folder copied to dist/public");
      },
    },
  ],
  resolve: {
    alias: {
      "@": srcDir,
    },
  },
  build: {
    target: "esnext",
    outDir: "dist",
    ssr: true,
    rollupOptions: {
      input: {
        ...Object.fromEntries(
          [...routeFiles, ...pluginFiles].map((file) => [
            path.relative(srcDir, file).replace(/\.ts$/, ""),
            file,
          ])
        ),
      },
      output: {
        format: "esm",
        dir: "dist",
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
      external: ["bun", /^node_modules:(?!\/efri\/core\/)/],
    },
    sourcemap: true,
    emptyOutDir: true,
    minify: "esbuild",
  },
  // server: {
  //   host: true,
  //   port: 3000,
  // },
  // envPrefix: ["VITE_", "BUN_"],
});
