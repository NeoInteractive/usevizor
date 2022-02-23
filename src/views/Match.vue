<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useStore } from "@/stores/user.store";
import { useRoute } from "vue-router";
import Default from "../components/scoreboards/Default.vue";

const route = useRoute();
let matchData = ref(undefined);
let user = ref(null);

const getMatchData = async () => {
  if (!route.params.id) return;
  const ref = doc(db, "matches", route.params.id);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) matchData.value = docSnap.data();
  else alert("Match not found with id: " + route.params.id);
};

onMounted(() => {
  const { auth_data } = useStore();
  user.value = auth_data;
  getMatchData();
});
</script>
<template>
  <div v-if="matchData" class="bg-gray-925">
    <div class="container-2xl mx-auto w-3/4 mt-12">
      <p class="text-heading font-bold text-4xl mb-4">
        Match Control - {{ matchData.heading }}
      </p>
      <div class="flex flex-row justify-between mt-4 items-center">
        <router-link
          to="/dashboard"
          class="text-heading text-sm opacity-50 hover:text-indigo-300 hover:opacity-100"
        >
          <i class="fa-solid fa-arrow-left mr-2"></i>Back to Dashboard
        </router-link>
        <code
          class="text-heading text-indigo-300 text-sm opacity-50 hover:text-indigo-300 hover:opacity-100"
        >
          {{ matchData.id }}
        </code>
      </div>

      <hr class="my-4" />
      <Default class="my-12" v-if="matchData" :matchData="matchData" />
      <div class="w-full flex flex-row">
        <div class="p-4 w-1/2">
          <h1 class="text-2xl text-heading text-white ml-2">
            <i class="fa-solid fa-square-info mr-4 text-indigo-400" />
            Match Information
          </h1>
          <div class="bg-gray-950 p-4 border border-gray-500 rounded mt-4">
            <div class="flex flex-row justify-between">
              <div
                class="w-1/2 text-center"
                :style="`background: ${matchData.team_one.color.bg};`"
              >
                <span :style="`color: ${matchData.team_one.color.text};`">
                  {{ matchData.team_one.name }}
                </span>
              </div>
              <div
                class="w-1/2 text-center"
                :style="`background: ${matchData.team_two.color.bg};`"
              >
                <span :style="`color: ${matchData.team_two.color.text};`">
                  {{ matchData.team_two.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="p-4 w-1/2">
          <h1 class="text-2xl text-heading text-white">Match Information</h1>
          <div
            class="bg-gray-950 p-4 border border-gray-500 rounded-md mt-4 flex flex-row justify-between cursor-pointer hover:bg-gray-925 hover:border-indigo-400 transition"
          >
            asdf
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="bg-gray-925"></div>
</template>
