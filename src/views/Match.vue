<script setup>
import { ref, onMounted } from "vue";
import { getGravatar } from "@/helpers";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Default from "@/components/scoreboards/Default.vue";
import { useStore } from "@/stores/user.store";
const userStore = useStore();
let matchData = ref();

const props = defineProps({
  match: {
    type: String,
    required: true,
  },
});

const getMatchData = async () => {
  const matchRef = doc(db, "matches", props.match);
  const matchRes = await getDoc(matchRef);
  matchData.value = matchRes.data();
  console.log(matchData);
};
onMounted(() => {
  getMatchData();
});
</script>
<template>
  <div class="container-2xl mx-auto w-2/3 mt-12">
    <p class="text-heading font-bold text-2xl mb-4">
      <span v-if="matchData">{{ matchData.heading }}</span>
      <span v-else>Scoreboard Preview</span>
    </p>
    <section
      class="bg-gray-925/25 rounded backdrop-blur-sm border border-gray-700 mb-6 p-4"
    >
      <Default v-if="matchData" :matchData="matchData" />
    </section>
    <p class="text-heading font-bold text-2xl mb-4">Match Configuration</p>
    <section
      class="bg-gray-925/25 rounded backdrop-blur-sm border border-gray-700"
    >
      <div class="flex flex-row">
        <div class="w-64 border-r border-indigo-500">
          <div class="flex flex-col flex-wrap px-4 py-4">
            <p
              class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer"
            >
              <i class="fa-solid fa-flag-pennant mr-2"></i> Scores
            </p>
            <p
              class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer"
            >
              <i class="fa-solid fa-paint-brush mr-2"></i>Team Config
            </p>
            <p
              class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer"
            >
              <i class="fa-solid fa-cogs mr-2"></i>Scoreboard Config
            </p>
          </div>
        </div>
        <div v-if="user" class="w-full p-4">
          <img
            v-if="user.email"
            :src="getGravatar(user.email)"
            class="w-16 rounded-full mb-4"
            alt=""
          />
          <h1>{{ user.displayName }}</h1>
          <h3 class="text-sm mb-12">{{ userStore.email }}</h3>
          <button class="px-4 py-2 rounded bg-indigo-500 text-white font-bold">
            Log Match Data
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
