<script setup>
import { onMounted } from "vue";
import { useAuthState } from "@/firebase";
import { useSignOut } from "@/firebase";
import { useRoute, useRouter } from "vue-router";

const { user } = useAuthState();
const router = useRouter();
const route = useRoute();
const page = route.params.page;

const signOutUser = async () => {
  await useSignOut();
  await router.replace({ name: "Home" });
};

onMounted(() => {
  console.log(page);
});
</script>
<template>
  <div class="bg-gray-925 min-h-screen">
    <div class="flex flex-row border-r border-gray-500 min-h-screen">
      <div class="w-64 min-h-full bg-gray-950 border-r border-gray-500">
        <div class="flex flex-col flex-wrap px-4 py-4 select-none">
          <figure class="p-4 h-12">
            <img src="@/assets/logo-long.svg" alt="" />
          </figure>

          <div class="mt-12 my-3 flex flex-col">
            <h3 class="text-sm uppercase text-indigo-300 font-bold mb-4 tracking-widest">
              Matches
            </h3>
            <router-link
              to="/dashboard/all"
              class="mb-6 hover:cursor-pointer p-2"
              :class="{
                'bg-gray-800 rounded': page == 'all',
              }"
            >
              <i class="fa-solid fa-trophy-star mr-1 w-4" /> My Matches
            </router-link>
            <router-link
              to="/dashboard/create"
              class="mb-6 hover:cursor-pointer p-2"
              :class="{ 'bg-gray-800 rounded': page == 'create' }"
            >
              <i class="fa-solid fa-plus mr-1 w-4" /> Create Match
            </router-link>
          </div>
          <div class="my-3 flex flex-col">
            <h3 class="text-sm uppercase text-indigo-300 font-bold mb-4 tracking-widest">
              Account
            </h3>
            <p class="mb-6 hover:cursor-pointer p-2 opacity-50">
              <i class="fa-solid fa-gear mr-1 w-4" /> Preferences
            </p>
            <p class="mb-6 hover:cursor-pointer p-2 opacity-50">
              <i class="fa-solid fa-file-invoice mr-1 w-4" /> Billing
            </p>
          </div>
          <div class="my-3 flex flex-col">
            <h3 class="text-sm uppercase text-indigo-300 font-bold mb-4 tracking-widest">
              App
            </h3>
            <router-link
              to="/dashboard/changelog"
              class="mb-6 hover:cursor-pointer p-2"
              :class="{
                'bg-gray-800 rounded': page == 'changelog',
              }"
            >
              Changelog
            </router-link>
            <router-link
              to="/dashboard/about"
              class="mb-6 hover:cursor-pointer p-2"
              :class="{ 'bg-gray-800 rounded': page == 'about' }"
            >
              About
            </router-link>
            <p class="mb-6 hover:cursor-pointer p-2" @click="signOutUser">Logout</p>
          </div>
        </div>
      </div>
      <div v-if="user" class="w-full">
        <div
          class="flex flex-row justify-between items-center bg-gray-950 px-4 py-2 border-b border-gray-500"
        >
          <h1 class="text-gray-300 tracking-wider font-light text-sm">
            Welcome back, {{ user.email }}
          </h1>
          <div class="tooltip tooltip-bottom" data-tip="Logout">
            <button @click="signOutUser" class="btn btn-sm btn-ghost">
              <i class="fa-solid fa-sign-out"></i>
            </button>
          </div>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>
