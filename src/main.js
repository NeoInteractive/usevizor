import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Particles from "particles.vue3";
import {
  faBars,
  faEnvelope,
  faKey,
  faUserCircle,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import "@/assets/index.css";

library.add([
  faGoogle,
  faBars,
  faEnvelope,
  faKey,
  faUserCircle,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faInfoCircle,
]);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(pinia)
  .use(Particles)
  .use(Toast, {
    position: "top-center",
    transition: "Vue-Toastification__fade",
    maxToasts: 20,
    newestOnTop: true,
  })
  .mount("#app");
