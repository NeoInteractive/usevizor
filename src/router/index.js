import { createRouter, createWebHistory } from "vue-router";
import { getUserState } from "@/firebase";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
  },
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const noAuth = to.matched.some((record) => record.meta.noAuth);

  const isAuth = await getUserState();

  if (requiresAuth && !isAuth) next({ name: "Login" });
  else if (noAuth && isAuth) next({ name: "Home" });
  else next();
});

export default router;
