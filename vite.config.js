import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    rollupOptions: {
      plugins: [nodeResolve(), commonjs()],
    },
  },
});
