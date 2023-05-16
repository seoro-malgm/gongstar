import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      port: 8080,
      hot: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        find: "@vue/runtime-core",
        replacement: "@vue/runtime-core/dist/runtime-core.esm-bundler.js",
        "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      },
    },
    // lodash: ['lodash'],
    optimizeDeps: {
      esbuildOptions: {
        target: "es2020",
      },
    },
    build: {
      chunkSizeWarningLimit: 1600,
      target: "es2020",
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "./src/assets/styles/variable.scss";
          `,
        },
      },
    },
    plugins: [vue()],
    watchOptions: {
      poll: true,
    },
    // transpileDependencies: ["vue-meta"],
  };
});
