<script setup>
import { ref } from "vue";
import { useAuthState } from "@/firebase";
import MyMatches from "@/components/dashboard/MyMatches.vue";
import CreateMatch from "@/components/dashboard/CreateMatch.vue";
import About from "@/components/dashboard/About.vue";
import Changelog from "@/components/dashboard/Changelog.vue";

const { user } = useAuthState();
let activeTab = ref("all-matches");
</script>
<template>
  <div class="bg-gray-925">
    <div class="mx-auto 2xl:w-3/4 xl:w-full max-w-screen-xl">
      <p
        class="text-heading tracking-wide font-bold text-3xl p-12 border-x border-gray-500 bg-gradient-to-r from-indigo-900 to-gray-950"
      >
        Dashboard
      </p>
      <div class="flex flex-row border-t border-gray-500">
        <div class="w-64 bg-gray-950 border-x border-b border-gray-500">
          <div class="flex flex-col flex-wrap px-4 py-4 select-none">
            <div class="my-3">
              <h3
                class="text-sm uppercase text-indigo-300 font-bold mb-4 tracking-widest"
              >
                Matches
              </h3>
              <p
                class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer"
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
            </div>
          </div>
        </div>
        <div v-if="user" class="w-full">
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
  </div>
</template>
