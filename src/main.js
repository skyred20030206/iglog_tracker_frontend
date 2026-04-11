import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";

import home from "./router/home.vue";
import login from "./router/login.vue";

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: home },
    { path: "/login", component: login },
  ],
});

app.use(router).mount("#app");
