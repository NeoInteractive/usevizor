<script setup>
import { ref } from "vue";
import { getTeamImage } from "@/helpers";
const props = defineProps({
  matchData: Object,
});
const matchData = ref(props.matchData);
</script>

<template>
  <div v-if="matchData" class="flex flex-row w-full justify-center">
    <div id="sponsors-left" class="">
      <div
        v-if="matchData.scoreboard.sponsors"
        class="text-center border-2 p-2"
        :class="{
          'bg-gray-200': !matchData.scoreboard.dark,
          'bg-gray-925': matchData.scoreboard.dark,
        }"
      >
        <h2
          class="text-gray-900 title font-bold tracking-widest uppercase text-sm text-shadow-lg pt-0.5"
          :class="{
            'bg-gray-200': !matchData.scoreboard.dark,
            'bg-gray-925': matchData.scoreboard.dark,
          }"
        >
          sponsor-left
        </h2>
      </div>
    </div>
    <div id="main" class="flex flex-col">
      <div
        v-if="matchData.scoreboard.show_heading"
        class="text-center border-2 border-b-0. rounded-tl-md rounded-tr-md py-.5"
        :class="{
          'bg-gray-200': !matchData.scoreboard.dark,
          'border-gray-200': !matchData.scoreboard.dark,
          'bg-gray-925': matchData.scoreboard.dark,
          'border-gray-800': matchData.scoreboard.dark,
        }"
      >
        <h2
          class="title font-bold tracking-widest uppercase text-sm text-shadow-lg pt-0.5"
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
          :class="{
            'bg-gray-200': !matchData.scoreboard.dark,
            'border-gray-200': !matchData.scoreboard.dark,
            'bg-gray-925': matchData.scoreboard.dark,
            'border-gray-800': matchData.scoreboard.dark,
          }"
        >
          <div class="grid grid-cols-4 grid-rows-1 py-1 px-3">
            <div class="col-span-3">
              <div class="flex flex-row justify-start">
                <img
                  v-if="matchData.team_one.show_icon"
                  :src="getTeamImage('one', matchData.team_one.name)"
                  class="rounded-md w-10 h-10"
                />
                <h2
                  class="font-bold text-xl tracking-wide pt-1.5 pl-2 text-shadow-lg"
                  :class="{
                    'text-gray-200': !matchData.scoreboard.dark,
                    'text-white': matchData.scoreboard.dark,
                  }"
                >
                  {{ matchData.team_one.name }}
                </h2>
              </div>
            </div>
            <div class="col-span-1">
              <h2
                class="text-shadow-md font-bold text-3xl tracking-wide pt-1 pr-2 text-shadow-lg text-right"
                :class="{
                  'text-gray-200': !matchData.scoreboard.dark,
                  'text-white': matchData.scoreboard.dark,
                }"
              >
                {{ matchData.team_one.score }}
              </h2>
            </div>
          </div>
        </div>
        <div
          class="bg-gradient-to-t from-blue-900 to-blue-800 bg-opacity-95 border-r-2 border-b-2 rounded-br-md w-64"
          :class="{
            'bg-gray-200': !matchData.scoreboard.dark,
            'border-gray-200': !matchData.scoreboard.dark,
            'bg-gray-925': matchData.scoreboard.dark,
            'border-gray-800': matchData.scoreboard.dark,
          }"
        >
          <div class="grid grid-cols-4 grid-rows-1 py-1 px-3">
            <div class="col-span-1">
              <h2
                class="text-shadow-md font-bold text-3xl tracking-wide pt-1 pl-2 text-shadow-lg"
                :class="{
                  'text-gray-200': !matchData.scoreboard.dark,
                  'text-white': matchData.scoreboard.dark,
                }"
              >
                {{ matchData.team_two.score }}
              </h2>
            </div>
            <div class="col-span-3">
              <div class="flex flex-row justify-end">
                <h2
                  class="text-shadow-md font-bold text-xl tracking-wide pt-1.5 pr-2 text-shadow-lg"
                  :class="{
                    'text-gray-200': !matchData.scoreboard.dark,
                    'text-white': matchData.scoreboard.dark,
                  }"
                >
                  {{ matchData.team_two.name }}
                </h2>
                <img
                  v-if="matchData.team_two.show_icon"
                  :src="getTeamImage('two', matchData.team_two.name)"
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
        class="text-center bg-gray-200 border-r-2 border-l-2 border-b-2"
      >
        <h2
          class="text-gray-900 title font-bold tracking-widest uppercase text-sm text-shadow-lg pt-0.5"
        >
          sponsor-right
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
