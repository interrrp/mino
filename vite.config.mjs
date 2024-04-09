import { join } from "node:path";

import { defineConfig } from "vite";

export default defineConfig({
  root: "src/web",
  build: {
    outDir: join(process.cwd(), "dist/web"),
    emptyOutDir: true,
  },
});
