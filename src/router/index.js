import { createRouter, createWebHistory } from "vue-router";
import { getUserState } from "@/firebase";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: { requiresAuth: false, has_nav: true, has_foot: true },
  },
  {
    path: "/beta/registered",
    name: "BetaRegistered",
    component: () => import("@/views/auth/BetaRegistered.vue"),
    meta: { requiresAuth: false, has_nav: true, has_foot: true },
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("@/views/Account.vue"),
    meta: { requiresAuth: false, has_nav: true, has_foot: true },
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () => import("@/views/auth/Login.vue"),
    meta: { requiresAuth: false, has_nav: true, has_foot: true },
  },
  {
    path: "/auth/signup",
    name: "SignUp",
    component: () => import("@/views/auth/SignUp.vue"),
    meta: { requiresAuth: false, has_nav: true, has_foot: true },
  },
  {
    path: "/auth/forgot-password",
    name: "ForgotPassword",
    component: () => import("@/views/auth/ForgotPassword.vue"),
    meta: { requiresAuth: false, has_nav: true, has_foot: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: { requiresAuth: true, has_nav: true, has_foot: true },
  },
  {
    path: "/dashboard/m/:id",
    name: "MatchAdmin",
    component: () => import("@/views/Match.vue"),
    meta: { requiresAuth: true, has_nav: true, has_foot: true },
  },
  {
    path: "/m/:id",
    name: "MatchScoreboard",
    component: () => import("@/views/PublicMatch.vue"),
    meta: { requiresAuth: false, has_nav: false, has_foot: false },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/error/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
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
