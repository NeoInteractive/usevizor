<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import { doc, onSnapshot, updateDoc, increment } from "firebase/firestore";
import { useStore } from "@/stores/user.store";
import { useRoute } from "vue-router";
import Default from "../components/scoreboards/Default.vue";

const route = useRoute();
let matchData = ref(undefined);
let user = ref(null);

const getMatchData = async () => {
  if (!route.params.id) return;
  onSnapshot(doc(db, "matches", route.params.id), (doc) => {
    matchData.value = doc.data();
    console.log("Fetched match data - Match ID:", route.params.id);
  });
};

const updateScore = async (team, action) => {
  const ref = doc(db, "matches", route.params.id);
  if (action === "add") {
    if (team === "team_one") {
      await updateDoc(ref, { ["team_one.score"]: increment(1) });
    } else if (team === "team_two") {
      await updateDoc(ref, { ["team_two.score"]: increment(1) });
    }
  } else if (action === "sub") {
    if (team === "team_one") {
      await updateDoc(ref, { ["team_one.score"]: increment(-1) });
    } else if (team === "team_two") {
      await updateDoc(ref, { ["team_two.score"]: increment(-1) });
    }
  }
};

const resetScore = (team) => {
  if (team === "team_one") {
    matchData.value.team_one.score = 0;
    updateDoc(doc(db, "matches", route.params.id), {
      team_one: matchData.value.team_one,
    });
  } else if (team === "team_two") {
    matchData.value.team_two.score = 0;
    updateDoc(doc(db, "matches", route.params.id), {
      team_two: matchData.value.team_two,
    });
  }
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
        {{ matchData.heading }}
      </p>
      <div class="flex flex-row justify-between mt-4 items-center bg-gray-950">
        <router-link
          to="/dashboard"
          class="text-heading text-sm opacity-50 hover:text-indigo-400 hover:opacity-100 hover:font-bold"
        >
          <i class="fa-solid fa-arrow-left mr-2"></i>Back to Dashboard
        </router-link>
        <code
          class="text-heading text-indigo-300 text-sm opacity-50 hover:text-indigo-300 hover:opacity-100"
        >
          {{ matchData.id }}
        </code>
      </div>

      <hr class="mt-4 mb-0" />
      <div class="pt-6 pb-6 mb-12 rounded-b-md bg-gray-900">
        <default />
      </div>
      <div class="w-full flex flex-row">
        <div class="p-4 w-1/2">
          <h1 class="text-2xl text-heading text-indigo-100 ml-2">Scores</h1>
          <div class="bg-gray-950 p-4 border border-gray-500 rounded mt-4">
            <div class="flex flex-row justify-between">
              <div class="w-1/2 select-none">
                <div
                  class="w-full py-3 text-center font-bold tracking-wider border border-2 border-gray-800"
                  :style="`color: ${matchData.team_one.color.text}; background: ${matchData.team_one.color.bg};`"
                >
                  {{ matchData.team_one.name }}
                </div>
                <div
                  class="py-6 bg-gray-900 rounded shadow-lg flex flex-row justify-center items-center text-center tracking-wider text-3xl"
                >
                  {{ matchData.team_one.score }}
                </div>
                <div v-if="matchData" class="mt-4 px-1 text-gray-300">
                  <div class="flex flex-row w-full">
                    <div
                      @click="updateScore('team_one', 'sub')"
                      class="flex justify-center items-center cursor-pointer w-1/3 p-1 group"
                    >
                      <div
                        class="opacity-50 bg-gray-950 hover:bg-indigo-500 hover:font-bold transition-all duration-200 w-full h-full items-center justify-center flex border-2 border-indigo-500 px-5 py-2.5 hover:opacity-100 group-hover:text-white select-none focus:scale-95"
                      >
                        <i class="fas fa-minus-circle"></i>
                      </div>
                    </div>
                    <div
                      @click="updateScore('team_one', 'add')"
                      class="flex justify-center items-center cursor-pointer w-full p-1 group"
                    >
                      <div
                        class="bg-gray-950 hover:bg-indigo-500 hover:font-bold transition-all duration-200 w-full h-full items-center justify-center flex border-2 border-indigo-500 px-5 py-2.5 group-hover:text-white select-none"
                      >
                        <i class="fas fa-plus-circle mr-2" /> Add Point
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-row w-full mt-3">
                    <div
                      @click="resetScore('team_one')"
                      class="flex justify-center items-center cursor-pointer w-full p-1 group"
                    >
                      <div
                        class="bg-gray-950 hover:bg-red-500 hover:font-bold transition-all duration-1000 w-full h-full items-center justify-center flex border-2 border-red-500 px-5 py-1.5 text-red-500 group-hover:text-white select-none opacity-50 hover:opacity-100"
                      >
                        <i class="fas fa-empty-set mr-2" /> Reset Score
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-1/2 select-none">
                <div
                  class="w-full py-3 text-center font-bold tracking-wider border border-2 border-gray-800"
                  :style="`color: ${matchData.team_two.color.text}; background: ${matchData.team_two.color.bg};`"
                >
                  {{ matchData.team_two.name }}
                </div>
                <div
                  class="py-6 bg-gray-900 rounded shadow-lg flex flex-row justify-center items-center text-center tracking-wider text-3xl"
                >
                  {{ matchData.team_two.score }}
                </div>
                <div v-if="matchData" class="mt-4 px-1 text-gray-300">
                  <div class="flex flex-row w-full">
                    <div
                      @click="updateScore('team_two', 'sub')"
                      class="flex justify-center items-center cursor-pointer w-1/3 p-1 group"
                    >
                      <div
                        class="opacity-50 bg-gray-950 hover:bg-indigo-500 hover:font-bold transition-all duration-200 w-full h-full items-center justify-center flex border-2 border-indigo-500 px-5 py-2.5 hover:opacity-100 group-hover:text-white select-none focus:scale-95"
                      >
                        <i class="fas fa-minus-circle"></i>
                      </div>
                    </div>
                    <div
                      @click="updateScore('team_two', 'add')"
                      class="flex justify-center items-center cursor-pointer w-full p-1 group"
                    >
                      <div
                        class="bg-gray-950 hover:bg-indigo-500 hover:font-bold transition-all duration-200 w-full h-full items-center justify-center flex border-2 border-indigo-500 px-5 py-2.5 group-hover:text-white select-none"
                      >
                        <i class="fas fa-plus-circle mr-2" /> Add Point
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-row w-full mt-3">
                    <div
                      @click="resetScore('team_two')"
                      class="flex justify-center items-center cursor-pointer w-full p-1 group"
                    >
                      <div
                        class="bg-gray-950 hover:bg-red-500 hover:font-bold transition-all duration-1000 w-full h-full items-center justify-center flex border-2 border-red-500 px-5 py-1.5 text-red-500 group-hover:text-white select-none opacity-50 hover:opacity-100"
                      >
                        <i class="fas fa-empty-set mr-2" /> Reset Score
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-4 w-1/2">
          <h1 class="text-2xl text-heading text-indigo-100">
            Match Information
          </h1>
          <div
            class="bg-gray-950 p-4 border border-gray-500 rounded-md mt-4 flex flex-col justify-between"
          >
            <div class="flex flex-row w-full justify-between mb-6">
              <h3 class="font-bold tracking-wide text-gray-100">Heading:</h3>
              <h3>{{ matchData.heading }}</h3>
            </div>
            <div class="flex flex-row w-full justify-between mb-6">
              <h3 class="font-bold tracking-wide text-gray-100">Subheading:</h3>
              <h3>
                {{ matchData.subheading }}
                <span class="text-amber-300" v-if="matchData.subheading == ''">
                  Visible, but no value set
                </span>
              </h3>
            </div>
            <div class="flex flex-row w-full justify-between mb-6">
              <h3 class="font-bold tracking-wide text-gray-100">
                Scoreboard Theme:
              </h3>
              <h3>{{ matchData.scoreboard.theme || "-" }}</h3>
            </div>
            <div class="flex flex-row w-full justify-between mb-6">
              <h3 class="font-bold tracking-wide text-gray-100">Dark Mode:</h3>
              <h3>
                {{ matchData.scoreboard.dark === true ? "Active" : "Disabled" }}
              </h3>
            </div>
          </div>
          <h1 class="text-2xl text-heading text-indigo-100 mt-12">
            Scoreboard Links
          </h1>
          <div
            class="bg-gray-950 p-4 border border-gray-500 rounded-md mt-4 flex flex-col justify-between"
          >
            <div class="flex flex-row w-full justify-between">
              <h3 class="font-bold tracking-wide">OBS Overlay URL:</h3>
              <div class="items-center">
                <code class="text-sm font-bold text-cyan-400">
                  https://usevizor.com/m/{{ matchData.id }}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="bg-gray-925"></div>
</template>
