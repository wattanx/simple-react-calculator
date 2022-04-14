import { defineConfig } from "vite";
import { peerDependencies } from "./package.json";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react({ jsxRuntime: "classic" })],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      fileName: (ext) => `index.${ext}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
    },
    target: "esnext",
    sourcemap: false,
  },
});
