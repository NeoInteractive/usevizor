export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: { requiresAuth: false, has_nav: true, has_foot: true },
  },
  {
    path: "/pricing",
    name: "Pricing",
    component: () => import("@/views/Pricing.vue"),
    meta: { requiresAuth: false, has_nav: true, has_foot: true },
  },
  {
    path: "/m/:id",
    name: "MatchScoreboard",
    component: () => import("@/views/PublicMatch.vue"),
    meta: { requiresAuth: false, has_nav: false, has_foot: false },
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("@/views/Account.vue"),
    meta: { requiresAuth: false, has_nav: true, has_foot: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/Login.vue"),
    meta: { requiresAuth: false, has_nav: true, has_foot: true },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("@/views/auth/SignUp.vue"),
    meta: { requiresAuth: false, has_nav: true, has_foot: true },
  },
  {
    path: "/forgot",
    name: "ForgotPassword",
    component: () => import("@/views/auth/ForgotPassword.vue"),
    meta: { requiresAuth: false, has_nav: true, has_foot: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    redirect: () => {
      return { path: "/dashboard/all" };
    },
    meta: { requiresAuth: true, has_nav: false, has_foot: true },
  },
  {
    path: "/dashboard/:page",
    name: "DashboardSubpage",
    component: () => import("@/views/Dashboard.vue"),
    meta: { requiresAuth: true, has_nav: false, has_foot: true },
  },
  {
    path: "/dashboard/m/:id",
    name: "MatchAdmin",
    component: () => import("@/views/Dashboard.vue"),
    meta: { requiresAuth: true, has_nav: false, has_foot: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/error/404.vue"),
  },
];
