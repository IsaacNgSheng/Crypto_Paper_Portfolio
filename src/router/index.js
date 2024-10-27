import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import OnlyProfit from "@/views/OnlyProfit.vue";

// Set various Routes Available
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/profit",
    name: "OnlyProfit",
    component: OnlyProfit,
  },
];

// Set Router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Export Content
export default router;
