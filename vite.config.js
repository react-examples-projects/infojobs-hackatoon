import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { dirname, resolve, join } from "path";
import { fileURLToPath } from "url";

const _dirname =typeof __dirname !== "undefined" ? __dirname : dirname(fileURLToPath(import.meta.url));// eslint-disable-line
const dir = resolve(_dirname, "./src");

export default defineConfig({
   optimizeDeps: {
    exclude: ["dayjs"]
  },
  server: {
    proxy: {
      "/__proxy": {
        target: "https://api.infojobs.net/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/__proxy/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@assets": join(dir, "/assets"),
      "@components": join(dir, "/components"),
      "@config": join(dir, "/config"),
      "@helpers": join(dir, "/helpers"),
      "@hooks": join(dir, "/hooks"),
      "@pages": join(dir, "/pages"),
      "@css": join(dir, "/styles"),
      app: join(dir, "/App.jsx"),
    },
  },
  plugins: [react()],
});
