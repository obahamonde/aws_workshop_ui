import { setupLayouts } from "virtual:generated-layouts"; // eslint-disable-line
import generatedRoutes from "~pages";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import { Icon } from "@iconify/vue";
import App from "./App.vue";
import { createHead } from "@vueuse/head";
import "@unocss/reset/tailwind.css";
import "./styles/main.scss";
import "uno.css";

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App)
  .use(pinia)
  .use(router)
  .use(createHead())
  .component("Icon", Icon)
  .mount("#app");
