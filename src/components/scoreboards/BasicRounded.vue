<script setup lang="ts">
import { MatchData } from "@/types/types";
import { defineProps, PropType } from "vue";

const sponsors = false;

const props = defineProps({
  matchData: {
    type: Object as PropType<MatchData>,
  },
});

const getTeamImage = (team: string) => {
  if (team === "one") {
    if (props.matchData?.team_one_img) {
      return props.matchData.team_one_img;
    } else
      return `https://ui-avatars.com/api/?name=${props.matchData?.team_one}&bold=true&background=141527&color=fff&size=128`;
  }
  if (team === "two") {
    if (props.matchData?.team_two_img) {
      return props.matchData.team_two_img;
    } else
      return `https://ui-avatars.com/api/?name=${props.matchData?.team_two}&bold=true&background=141527&color=fff&size=128`;
  }
};
</script>

<template>
  <section v-if="props.matchData" class="scoreboard w-full">
    <div class="parent">
      <div
        v-if="sponsors"
        class="div1 bg-black bg-opacity-80 border-l-2 border-b-2 border-blue-100 p-1 text-right text-white flex align-center justify-center"
        style="border-bottom-left-radius: 60px"
      >
        <img :src="props.matchData.team_one_img" width="160" height="40" />
      </div>
      <div
        v-if="sponsors"
        class="div2 bg-black bg-opacity-80 border-r-2 border-b-2 border-blue-100 p-1 text-white flex align-center justify-center"
        style="border-bottom-right-radius: 60px"
      >
        <img :src="props.matchData.team_two_img" width="120" height="40" />
        {{ props.matchData }}
      </div>
      <div
        class="div3 text-center bg-black bg-opacity-80 border-r-2 border-l-2 border-b-2 border-blue-100"
      >
        <h2
          class="text-white title font-bold tracking-widest uppercase text-sm text-shadow-lg pt-0.5"
        >
          {{ props.matchData.match_name }}
        </h2>
      </div>
      <div
        class="div5 bg-red-700 bg-opacity-80 border-l-2 border-b-2 border-blue-100 rounded-bl-3xl"
      >
        <div class="grid grid-cols-4 grid-rows-1 py-1 px-3">
          <div class="col-span-3">
            <div class="flex flex-row justify-start">
              <img :src="getTeamImage('one')" class="rounded-md w-10 h-10" />
              <h2
                class="text-white font-bold text-xl tracking-wide pt-1.5 pl-2 text-shadow-lg"
              >
                {{ props.matchData.team_one }}
              </h2>
            </div>
          </div>
          <div class="col-span-1">
            <h2
              class="text-white font-bold text-3xl tracking-wide pt-1 pr-2 text-shadow-lg text-right"
            >
              {{ props.matchData.team_one_score }}
            </h2>
          </div>
        </div>
      </div>
      <div
        class="div6 bg-blue-800 bg-opacity-80 border-r-2 border-b-2 border-l-2 border-blue-100 rounded-br-3xl"
      >
        <div class="grid grid-cols-4 grid-rows-1 py-1 px-3">
          <div class="col-span-1">
            <h2
              class="text-white font-bold text-3xl tracking-wide pt-1 pl-2 text-shadow-lg"
            >
              {{ props.matchData.team_two_score }}
            </h2>
          </div>
          <div class="col-span-3">
            <div class="flex flex-row justify-end">
              <h2
                class="text-white font-bold text-xl tracking-wide pt-1.5 pr-2 text-shadow-lg"
              >
                {{ props.matchData.team_two }}
              </h2>
              <img :src="getTeamImage('two')" class="rounded-md w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      <div
        class="div4 text-center h-4 bg-black bg-opacity-60 border-r-2 border-b-2 border-l-2 border-blue-100"
        style="
          border-bottom-left-radius: 60px;
          border-bottom-right-radius: 60px;
        "
      >
        <h2
          class="text-white title text-xs font-bold tracking-widest uppercase text-shadow-lg"
        >
          {{ props.matchData.match_type }}
        </h2>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.parent {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.div1 {
  grid-area: 1 / 1 / 3 / 4;
}
.div2 {
  grid-area: 1 / 10 / 3 / 13;
}
.div3 {
  grid-area: 1 / 4 / 2 / 10;
}
.div4 {
  grid-area: 4 / 6 / 5 / 8;
}
.div5 {
  grid-area: 2 / 4 / 4 / 7;
}
.div6 {
  grid-area: 2 / 7 / 4 / 10;
}
.body-bg {
  background-color: #020518;
  background-image: linear-gradient(315deg, #020518 0%, #141527 74%);
}
</style>
