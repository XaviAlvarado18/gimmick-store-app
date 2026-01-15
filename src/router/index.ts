import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ProductDetailPage from "../pages/ProductDetailPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomePage },
    {
      path: "/product/:id",
      name: "product",
      component: ProductDetailPage,
      props: true,
    },
  ],
});
