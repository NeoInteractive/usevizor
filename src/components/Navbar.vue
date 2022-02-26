<script setup>
import { ref, onMounted } from "vue";
import { useAuthState, useSignOut } from "@/firebase";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/user.store";
import Menu from "./Menu.vue";
const { user } = useAuthState();
const router = useRouter();
let userAuth = ref(null);
let userProfile = ref(null);
const signOutUser = async () => {
  await useSignOut();
  await router.replace({ name: "Home" });
};
const goToHome = () => {
  router.push({ name: "Home" });
};
onMounted(() => {
  const { auth_data, profile_data } = useStore();
  userAuth.value = auth_data;
  userProfile.value = profile_data;
});
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
        <div class="py-2 px-4 ml-4 font-heading inline">
          {{ userAuth.displayName }}
          <div
            class="tooltip"
            v-show="userProfile.verified"
            data-tip="Verified"
          >
            <span class="fa-stack">
              <i class="fa-solid fa-square fa-stack text-yellow-300" />
              <i class="fa fa-badge-check fa-stack-1x fa-inverse text-black" />
            </span>
          </div>
          <div class="tooltip" v-show="userProfile.pro" data-tip="Pro Plan">
            <span class="fa-stack">
              <i class="fa-solid fa-square fa-stack text-cyan-400" />
              <i
                class="fa fa-rocket-launch fa-stack-1x fa-inverse text-black"
              />
            </span>
          </div>
        </div>
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
