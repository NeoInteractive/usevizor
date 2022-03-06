<script setup>
import { ref } from "vue";
import { useAuthState } from "@/firebase";
import MyMatches from "@/components/dashboard/MyMatches.vue";
import CreateMatch from "@/components/dashboard/CreateMatch.vue";
import About from "@/components/dashboard/About.vue";
import Changelog from "@/components/dashboard/Changelog.vue";
import { useSignOut } from "@/firebase";
import { useRoute, useRouter } from "vue-router";
const { user } = useAuthState();
let activeTab = ref("all-matches");
const router = useRouter();
const route = useRoute();
const page = route.params.page;
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
          <figure class="p-4 h-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 12644 2630"
            >
              <path
                fill="#eee"
                d="M6469.06 31.922 5629.4 2575.02h-511.64L4281.66 31.922h581.17L5372.68 1729.1 5884.33 31.922h584.73Z"
              />
              <path
                fill="#eee"
                d="M6871.76 2575.02h-511.65V31.922h511.65V2575.02Z"
              />
              <path
                fill="#eee"
                d="M8749.16 2575.02H6770.34L7861.36 540.897H6770.34V31.922h1978.82L7661.7 2066.05h1087.46v508.97Z"
              />
              <path
                fill="#eee"
                d="M10783.2 1314.11c0 120.6-16 237.05-48.1 349.37-30.9 111.13-74.9 215.77-131.9 313.9-57.1 96.94-126 185.62-206.8 266.01-80.8 80.4-170 149.56-267.4 207.49-97.5 56.75-202.65 100.5-315.56 131.24-112.9 31.92-229.97 47.88-351.19 47.88-121.23 0-238.29-15.96-351.2-47.88-111.72-30.74-216.9-74.49-315.54-131.24-97.46-57.93-186.59-127.09-267.41-207.49-80.81-80.39-150.34-169.07-208.58-266.01-57.04-98.13-101.61-202.77-133.7-313.9-30.9-112.32-46.35-228.77-46.35-349.37 0-120.59 15.45-237.05 46.35-349.363 32.09-112.317 76.66-216.95 133.7-313.897 58.24-96.948 127.77-185.62 208.58-266.015 80.82-80.396 169.95-148.969 267.41-205.718 98.64-56.75 203.82-100.495 315.54-131.234C9223.96 15.96 9341.02 0 9462.25 0c121.22 0 238.29 15.96 351.19 47.883 112.91 30.74 218.06 74.484 315.56 131.234 97.4 56.749 186.6 125.322 267.4 205.718 80.8 80.395 149.7 169.067 206.8 266.015 57 96.947 101 201.58 131.9 313.897 32.1 112.313 48.1 228.773 48.1 349.363Zm-508 0c0-111.13-21.4-215.76-64.2-313.89-42.8-99.316-101-185.032-174.7-257.152-72.51-73.302-158.68-131.234-258.51-173.796-98.64-42.563-203.83-63.844-315.54-63.844-112.91 0-218.68 21.281-317.33 63.844-98.64 42.562-184.81 100.494-258.49 173.796-73.69 72.12-131.92 157.836-174.71 257.152-42.78 98.13-64.18 202.76-64.18 313.89 0 111.14 21.4 215.77 64.18 313.9 42.79 96.95 101.02 182.07 174.71 255.38 73.68 73.3 159.85 131.23 258.49 173.79 98.65 42.56 204.42 63.84 317.33 63.84 111.71 0 216.9-21.28 315.54-63.84 99.83-42.56 186-100.49 258.51-173.79 73.7-73.31 131.9-158.43 174.7-255.38 42.8-98.13 64.2-202.76 64.2-313.9Z"
              />
              <path
                fill="#eee"
                d="M11110.5 540.897V1558.85h511.6c70.1 0 136.1-13.01 197.9-39.02 61.8-27.19 115.9-63.84 162.2-109.95 46.4-46.11 82.6-99.9 108.8-161.38 27.3-62.67 41-128.87 41-198.63 0-69.753-13.7-135.37-41-196.849-26.2-62.661-62.4-117.047-108.8-163.156-46.3-46.109-100.4-82.169-162.2-108.179-61.8-27.193-127.8-40.789-197.9-40.789h-511.6Zm0 2034.123h-511.7V31.922h1023.3c93.9 0 184.2 12.414 271 37.242 86.7 23.646 167.6 57.932 242.4 102.859 76.1 43.745 145 96.948 206.8 159.609 63 61.479 116.5 130.052 160.5 205.718 45.1 75.666 79.6 156.653 103.4 242.96 24.9 86.307 37.4 176.161 37.4 269.56 0 87.49-11.3 172.62-33.9 255.38-21.4 82.76-52.8 161.38-94.4 235.86-40.5 74.49-90.4 143.06-149.8 205.72-59.4 62.66-126 117.05-199.7 163.16l283.5 665.03h-543.7l-222.9-512.52-572.2 3.55v508.97Z"
              />
              <path
                fill="url(#a)"
                d="M1850.28 625.501c723.64 24.864 1533.31-80.381 1847.69-136.112-89.17 565.881-190.77 873.831-230.42 957.071-319.81 440.7-803.46 645.19-1005.3 692.35l-205.78-308.66h-222.92l-52.52 86.81h-130.75V625.501Z"
              />
              <path
                fill="url(#b)"
                d="M1850.28 625.589C1125.79 650.47 315.182 545.156.438 489.389 89.71 1055.64 191.43 1363.79 231.13 1447.08c320.181 440.99 804.389 645.62 1006.469 692.8l206.01-308.86h223.19l52.57 86.87h130.91V625.589Z"
              />
              <defs>
                <linearGradient
                  id="a"
                  x1="3611.81"
                  x2="1999.23"
                  y1="2138.81"
                  y2="1993.12"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#65A9E9" />
                  <stop offset="1" stop-color="#6765E9" />
                </linearGradient>
                <linearGradient
                  id="b"
                  x1="86.7"
                  x2="1701.13"
                  y1="2139.88"
                  y2="1993.95"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#65A9E9" />
                  <stop offset="1" stop-color="#6765E9" />
                </linearGradient>
              </defs>
            </svg>
          </figure>

          <div class="mt-12 my-3 flex flex-col">
            <h3
              class="text-sm uppercase text-indigo-300 font-bold mb-4 tracking-widest"
            >
              Matches
            </h3>
            <router-link
              to="/dashboard/matches"
              class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer"
              :class="{ 'text-indigo-400': page == 'matches' }"
            >
              My Matches
            </router-link>
            <router-link
              to="/dashboard/create"
              class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer"
              :class="{ 'text-indigo-400': page == 'create' }"
            >
              Create Match
            </router-link>
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
          v-if="page == 'matches'"
          @create-match="router.push('/dashboard/create')"
        />
        <create-match
          v-if="page == 'create'"
          @create-match="router.push('/dashboard/matches')"
        />
        <changelog v-if="page == 'changelog'" />
        <about v-if="activeTab == 'about'" />
      </div>
    </div>
  </div>
</template>
