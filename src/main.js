import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";

import home from "./router/home.vue";
import login from "./router/login.vue";

// === 全域 Fetch 攔截器 ===
const PRODUCTION_API_URL = import.meta.env.VITE_API_BASE_URL;

// 只有當線上環境變數存在時（也就是在 Vercel 生產環境），才啟動攔截
if (PRODUCTION_API_URL) {
  const originalFetch = window.fetch;

  window.fetch = async (url, options) => {
    // 如果請求網址是字串，而且是以 /api 開頭
    if (typeof url === "string" && url.startsWith("/api")) {
      // 魔法發生的地方：自動把 /api 換成 Render 的後端網址
      // 範例：/api/member/auth -> https://xxx.onrender.com/member/auth
      url = `${PRODUCTION_API_URL}${url.replace(/^\/api/, "")}`;
    }

    // 呼叫原本的 fetch 發送請求
    return originalFetch(url, options);
  };
}
// =========================

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: home },
    { path: "/login", component: login },
  ],
});

app.use(router).mount("#app");
