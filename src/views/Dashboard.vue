<script setup>
import { ref } from "vue";
import { useAuthState } from "@/firebase";
import MyMatches from "@/components/dashboard/MyMatches.vue";
import CreateMatch from "@/components/dashboard/CreateMatch.vue";
import About from "@/components/dashboard/About.vue";
import Changelog from "@/components/dashboard/Changelog.vue";
import { useSignOut } from "@/firebase";
import { useRouter } from "vue-router";
const { user } = useAuthState();
let activeTab = ref("all-matches");
const router = useRouter();
const signOutUser = async () => {
  await useSignOut();
  await router.replace({ name: "Home" });
};
</script>
<template>
  <div class="bg-gray-925 h-screen">
    <div class="flex flex-row border-r border-gray-500 h-screen">
      <div class="w-64 h-full bg-gray-950 border-r border-gray-500">
        <div class="flex flex-col flex-wrap px-4 py-4 select-none">
          <figure class="p-4">
            <img src="@/assets/logo-long.svg" alt="VIZOR" />
          </figure>
          <!-- <div class="mt-12 mb-3">
            <p
              class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer"
              @click="activeTab = 'all-matches'"
            >
              Dashboard
            </p>
            <p
              class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer opacity-50"
            >
              Analytics
            </p>
          </div> -->
          <div class="mt-12 my-3">
            <h3
              class="text-sm uppercase text-indigo-300 font-bold mb-4 tracking-widest"
            >
              Matches
            </h3>
            <p
              class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer"
              :class="{ 'text-indigo-400': activeTab == 'my-matches' }"
              @click="activeTab = 'all-matches'"
            >
              My Matches
            </p>
            <p
              class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer"
              @click="activeTab = 'create-match'"
            >
              Create Match
            </p>
          </div>
          <div class="my-3">
            <h3
              class="text-sm uppercase text-indigo-300 font-bold mb-4 tracking-widest"
            >
              Account
            </h3>
            <p
              class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer opacity-50"
            >
              Preferences
            </p>
            <p
              class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer opacity-50"
            >
              Billing
            </p>
          </div>
          <div class="my-3">
            <h3
              class="text-sm uppercase text-indigo-300 font-bold mb-4 tracking-widest"
            >
              App
            </h3>
            <p
              class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer"
              @click="activeTab = 'changelog'"
            >
              Changelog
            </p>
            <p
              class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer"
              @click="activeTab = 'about'"
            >
              About
            </p>
            <p
              class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer"
              @click="signOutUser"
            >
              Logout
            </p>
          </div>
        </div>
      </div>
      <div v-if="user" class="w-full">
        <div
          class="flex flex-row justify-between items-center bg-gray-950 px-4 py-6 border-b border-gray-500"
        >
          <h1 class="text-gray-300 tracking-wider font-light text-sm">
            VIZOR Alpha
          </h1>
          <button @click="signOutUser" class="btn btn-sm btn-primary">
            <i class="fa-solid fa-sign-out mr-2"></i> Log Out
          </button>
        </div>
        <my-matches
          v-if="activeTab == 'all-matches'"
          @create-match="activeTab = 'create-match'"
        />
        <create-match
          v-if="activeTab == 'create-match'"
          @match-created="activeTab = 'all-matches'"
        />
        <changelog v-if="activeTab == 'changelog'" />
        <about v-if="activeTab == 'about'" />
      </div>
    </div>
  </div>
</template>
