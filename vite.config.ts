import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/",
    build: {
      outDir: "dist"
    },

    server: {
      port: 5173,
      strictPort: true
    }
  }
});