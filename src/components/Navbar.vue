<script setup>
import { useAuthState, useSignOut } from "@/firebase";
import { useRouter } from "vue-router";
import Menu from "./Menu.vue";
const { user } = useAuthState();
const router = useRouter();
const signOutUser = async () => {
  await useSignOut();
  await router.replace({ name: "Home" });
};
const goToHome = () => {
  router.push({ name: "Home" });
};
</script>
<template>
  <nav class="t-transition-effect nav-style px-2 md:px-0">
    <div class="t-main-set flex justify-between items-center">
      <img
        src="@/assets/logo-long.svg"
        alt="Vizor Logo"
        class="w-28"
        @click="goToHome"
      />

      <div class="hidden md:block" v-if="user">
        <router-link
          :to="{ name: 'Dashboard' }"
          class="nav-link t-transition-effect"
        >
          Dashboard
        </router-link>
        <a
          class="t-transition-effect py-2 px-4 ml-4 font-heading rounded cursor-pointer bg-error hover:bg-opacity-75"
          @click="signOutUser"
        >
          Log Out
        </a>
      </div>
      <div class="hidden md:block" v-else>
        <router-link :to="{ name: 'Home' }" class="nav-link t-transition-effect"
          >Home
        </router-link>
        <router-link
          :to="{ name: 'Login' }"
          class="nav-link t-transition-effect"
        >
          Login
        </router-link>
        <router-link
          :to="{ name: 'SignUp' }"
          class="nav-link t-transition-effect"
        >
          Create an Account
        </router-link>
      </div>
      <div class="block md:hidden">
        <Menu />
      </div>
    </div>
  </nav>
</template>

<style lang="postcss" scoped>
.nav-style {
  @apply py-4 px-2
  shadow-md bg-gray-950
  backdrop-filter backdrop-blur-sm border-b border-indigo-500;
}
.nav-link {
  @apply py-2 px-4 ml-2 font-heading rounded text-white;
}
</style>
