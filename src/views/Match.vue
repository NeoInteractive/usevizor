<script setup>
import { ref, onMounted } from "vue";
import { doc, onSnapshot, updateDoc, increment } from "firebase/firestore";
import { db } from "@/firebase";
import { useStore } from "@/stores/user.store";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import ScoreboardDefault from "@/components/scoreboards/ScoreboardDefault.vue";

const toast = useToast();
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
const copy = (text) => {
  navigator.clipboard.writeText(text);
  toast.success("OBS Overlay URL copied to clipboard!");
};
onMounted(() => {
  const { auth_data } = useStore();
  user.value = auth_data;
  getMatchData();
});
</script>
<template>
  <div v-if="matchData" class="bg-gray-925">
    <div class="container-2xl mx-auto max-w-screen-xl">
      <p
        class="text-heading text-3xl px-4 py-12 border border-gray-500 bg-gradient-to-r from-indigo-900 to-gray-950"
      >
        {{
          matchData.heading == "" ? `Match: ${matchData.id}` : matchData.heading
        }}
      </p>
      <div
        class="flex flex-row justify-between items-center bg-gray-950 p-4 border-x border-gray-500"
      >
        <router-link
          to="/dashboard/"
          class="text-heading text-sm opacity-80 tracking-wider hover:text-indigo-400 hover:opacity-100 hover:font-bold"
        >
          <i class="fa-solid fa-arrow-left mr-2" />Dashboard
        </router-link>
        <div class="text-heading text-white text-sm flex flex-row items-center">
          <p class="text-xs mr-4">Scoreboard preview background color:</p>
          <select class="select select-bordered select-xs select-ghost">
            <option disabled>----</option>
            <option selected value="default">Dark</option>
          </select>
        </div>
      </div>
      <div class="pt-6 pb-6 mb-12 bg-gray-950 border border-gray-500">
        <scoreboard-default />
      </div>
      <div class="w-full flex flex-row">
        <div class="w-2/5">
          <h1 class="text-2xl text-heading text-indigo-100">
            Match Information
          </h1>
          <div
            class="bg-gray-950 p-4 border border-gray-500 mt-4 flex flex-col justify-between"
          >
            <div class="flex flex-row w-full justify-between mb-6">
              <h3 class="font-bold tracking-wide text-gray-100">Heading:</h3>
              <h3>{{ matchData.heading }}</h3>
            </div>
            <div class="flex flex-row w-full justify-between mb-6">
              <h3 class="font-bold tracking-wide text-gray-100">Subheading:</h3>
              <h3>
                {{ matchData.subheading }}
                <span
                  class="text-amber-300"
                  v-if="
                    matchData.subheading == '' &&
                    matchData.scoreboard.show_subheading
                  "
                >
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
            class="bg-gray-950 p-4 border border-gray-500 mt-4 flex flex-col justify-between"
          >
            <div class="flex flex-col w-full justify-between">
              <h3 class="font-bold tracking-wide">OBS Overlay URL:</h3>
              <div class="items-center">
                <code
                  @click="copy(`https://usevizor.com/m/${matchData.id}`)"
                  class="text-xs font-bold text-cyan-400 cursor-pointer"
                >
                  https://usevizor.com/m/{{ matchData.id }}
                </code>
              </div>
            </div>
          </div>
        </div>
        <div class="pl-6 w-full">
          <h1 class="text-2xl text-heading text-indigo-100 ml-2">Scores</h1>
          <div class="bg-gray-950 border border-gray-500 mt-4">
            <div class="flex flex-row justify-between">
              <div class="w-1/2 select-none border-r border-gray-500">
                <div
                  class="w-full py-3 text-center font-bold tracking-wider border border-2 border-gray-800"
                >
                  {{ matchData.team_one.name }}
                </div>
                <div
                  class="py-6 bg-gray-900 rounded shadow-lg flex flex-row justify-center items-center text-center tracking-wider text-3xl"
                >
                  {{ matchData.team_one.score }}
                </div>
                <div v-if="matchData" class="p-2 text-gray-300">
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
                >
                  {{ matchData.team_two.name }}
                </div>
                <div
                  class="py-6 bg-gray-900 rounded shadow-lg flex flex-row justify-center items-center text-center tracking-wider text-3xl"
                >
                  {{ matchData.team_two.score }}
                </div>
                <div v-if="matchData" class="p-2 text-gray-300">
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
          <h1 class="text-2xl text-heading text-indigo-100 mt-12">
            Edit Match Data
          </h1>
          <div
            class="bg-gray-950 p-4 border border-gray-500 mt-4 flex flex-col justify-between"
          >
            <div class="flex flex-row w-full justify-between mb-4">
              <div class="flex items-center">
                <h3 class="font-bold">Heading:</h3>
              </div>
              <input
                type="text"
                placeholder="Type here"
                class="input w-full max-w-xs"
              />
            </div>
            <div class="flex flex-row w-full justify-between mb-4">
              <div class="flex items-center">
                <h3 class="font-bold">Subheading:</h3>
              </div>
              <input
                type="text"
                placeholder="Type here"
                class="input w-full max-w-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="bg-gray-925"></div>
</template>
