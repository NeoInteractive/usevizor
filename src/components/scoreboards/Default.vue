<script setup>
import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

let route = useRoute();
let matchData = ref();

function getMatchData() {
  if (!route.params.id) return;
  onSnapshot(
    doc(db, "matches", route.params.id),
    (doc) => (matchData.value = doc.data())
  );
}

onMounted(() => {
  getMatchData();
});
</script>

<template>
  <div v-if="matchData" class="flex flex-row w-full justify-center">
    <div id="sponsors-left" class="">
      <div
        v-if="matchData.scoreboard.sponsors"
        class="text-center border-l-2 border-b-2 p-2 rounded-bl-md"
        :class="{
          'bg-gray-200': !matchData.scoreboard.dark,
          'border-gray-200': !matchData.scoreboard.dark,
          'bg-gray-925': matchData.scoreboard.dark,
          'border-gray-800': matchData.scoreboard.dark,
        }"
      >
        <h2
          class="text-gray-900 title font-bold tracking-widest uppercase text-sm text-shadow-lg p-1"
          :class="{
            'bg-gray-200': !matchData.scoreboard.dark,
            'bg-gray-925': matchData.scoreboard.dark,
            'text-gray-925': !matchData.scoreboard.dark,
            'text-gray-200': matchData.scoreboard.dark,
          }"
        >
          <img src="../../assets/ni.svg" class="w-28" alt="" />
        </h2>
      </div>
    </div>
    <div id="main" class="flex flex-col">
      <div
        v-if="matchData.scoreboard.show_heading"
        class="text-center border-x-2 py-1"
        :class="{
          'bg-gray-200': !matchData.scoreboard.dark,
          'border-gray-200': !matchData.scoreboard.dark,
          'bg-gray-925': matchData.scoreboard.dark,
          'border-gray-800': matchData.scoreboard.dark,
        }"
      >
        <h2
          class="title font-bold tracking-widest text-sm text-shadow-lg pt-0.5"
          :class="{
            'text-gray-925': !matchData.scoreboard.dark,
            'text-gray-200': matchData.scoreboard.dark,
          }"
        >
          {{ matchData.heading }}
        </h2>
      </div>
      <div class="flex flex-row">
        <div
          class="bg-gradient-to-t from-red-900 to-red-800 bg-opacity-95 border-l-2 border-b-2 rounded-bl-md w-64"
          :style="`color: ${matchData.team_one.color.text}; background: ${matchData.team_one.color.bg};`"
          :class="{
            'border-gray-200': !matchData.scoreboard.dark,
            'border-gray-800': matchData.scoreboard.dark,
          }"
        >
          <div class="grid grid-cols-4 grid-rows-1 py-1 px-3">
            <div class="col-span-3">
              <div class="flex flex-row justify-start">
                <img
                  v-if="matchData.team_one.show_logo"
                  :src="matchData.team_one.logo"
                  class="rounded-md w-10 h-10"
                />
                <h2
                  class="font-bold text-xl tracking-wide pt-1.5 pl-2 text-shadow-lg"
                  :style="`color: ${matchData.team_one.color.text};`"
                >
                  {{ matchData.team_one.name }}
                </h2>
              </div>
            </div>
            <div class="col-span-1">
              <h2
                class="text-shadow-md font-bold text-3xl tracking-wide pt-1 pr-2 text-shadow-lg text-right"
                :style="`color: ${matchData.team_one.color.text};`"
              >
                {{ matchData.team_one.score }}
              </h2>
            </div>
          </div>
        </div>
        <div
          class="bg-gradient-to-t from-blue-900 to-blue-800 bg-opacity-95 border-r-2 border-b-2 rounded-br-md w-64"
          :style="`color: ${matchData.team_two.color.text}; background: ${matchData.team_two.color.bg};`"
          :class="{
            'border-gray-200': !matchData.scoreboard.dark,
            'border-gray-800': matchData.scoreboard.dark,
          }"
        >
          <div class="grid grid-cols-4 grid-rows-1 py-1 px-3">
            <div class="col-span-1">
              <h2
                class="text-shadow-md font-bold text-3xl tracking-wide pt-1 pl-2 text-shadow-lg"
                :style="`color: ${matchData.team_two.color.text};`"
              >
                {{ matchData.team_two.score }}
              </h2>
            </div>
            <div class="col-span-3">
              <div class="flex flex-row justify-end">
                <h2
                  class="text-shadow-md font-bold text-xl tracking-wide pt-1.5 pr-2 text-shadow-lg"
                  :style="`color: ${matchData.team_two.color.text};`"
                >
                  {{ matchData.team_two.name }}
                </h2>
                <img
                  v-if="matchData.team_two.show_logo"
                  :src="matchData.team_two.logo"
                  class="rounded-md w-10 h-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="sponsors-right" class="">
      <div
        v-if="matchData.scoreboard.sponsors"
        class="text-center border-r-2 border-b-2 p-2 rounded-br-md"
        :class="{
          'bg-gray-200': !matchData.scoreboard.dark,
          'border-gray-200': !matchData.scoreboard.dark,
          'bg-gray-925': matchData.scoreboard.dark,
          'border-gray-800': matchData.scoreboard.dark,
        }"
      >
        <h2
          class="text-gray-900 title font-bold tracking-widest uppercase text-sm text-shadow-lg p-1"
          :class="{
            'bg-gray-200': !matchData.scoreboard.dark,
            'bg-gray-925': matchData.scoreboard.dark,
            'text-gray-925': !matchData.scoreboard.dark,
            'text-gray-200': matchData.scoreboard.dark,
          }"
        >
          <img src="../../assets/logo-long.svg" class="w-28" alt="" />
        </h2>
      </div>
    </div>
  </div>
  <div v-if="matchData" class="flex flex-row w-full justify-center">
    <div id="main" class="flex flex-col">
      <div
        v-if="matchData.scoreboard.show_subheading"
        class="text-center border-x-2 py-1 px-4"
        :class="{
          'bg-gray-200': !matchData.scoreboard.dark,
          'border-gray-200': !matchData.scoreboard.dark,
          'bg-gray-925': matchData.scoreboard.dark,
          'border-gray-800': matchData.scoreboard.dark,
        }"
      >
        <h2
          class="title font-bold tracking-widest text-xs text-shadow-lg pt-0.5"
          :class="{
            'text-gray-925': !matchData.scoreboard.dark,
            'text-gray-200': matchData.scoreboard.dark,
          }"
        >
          {{ matchData.subheading || "Default Subheading" }}
        </h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-shadow-md {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.82), 0 2px 4px rgba(0, 0, 0, 0.28);
}

.text-shadow-lg {
  text-shadow: 0 15px 30px rgba(0, 0, 0, 0.21), 0 5px 15px rgba(0, 0, 0, 0.18);
}
</style>
