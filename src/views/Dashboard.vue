<script setup>
import { ref } from "vue";
import { useAuthState } from "@/firebase";
import AllMatches from "../components/dashboard/AllMatches.vue";
import CreateMatch from "../components/dashboard/CreateMatch.vue";

const { user } = useAuthState();
let activeTab = ref("all-matches");
</script>
<template>
  <div class="bg-gray-925">
    <div class="container-2xl mx-auto w-3/4 mt-12">
      <p class="text-heading font-bold text-4xl mb-6">Dashboard</p>
      <hr class="mb-0" />
      <div class="flex flex-row">
        <div class="w-64 border-r border-indigo-500">
          <div class="flex flex-col flex-wrap px-4 py-4">
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
                class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer"
              >
                Preferences
              </p>
              <p
                class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer"
              >
                Billing
              </p>
            </div>
          </div>
        </div>
        <div v-if="user" class="w-full p-8">
          <all-matches v-if="activeTab == 'all-matches'" />
          <create-match v-if="activeTab == 'create-match'" />
        </div>
      </div>
    </div>
  </div>
</template>
