import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  server: {
    proxy: {
      // 請求路徑開頭是 /api，就啟動代理
      "/api": {
        // 2. 後端 FastAPI 地址
        target: "http://127.0.0.1:8000",
        // 3. 允許跨域修改 Origin
        changeOrigin: true,
        // 4. 重寫路徑：把開頭的 /api 拔掉，再傳給後端
        // 例子：前端呼叫 /api/login -> 後端實際收到 /login
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
