<script setup>
import { reactive } from "vue";
import ScoreboardDefault from "@/components/scoreboards/ScoreboardDefault.vue";

let newMatch = reactive({
  id: "000",
  heading: "VIZOR Invitational 2022",
  subheading: "Best of 7",
  status: "active",
  created_at: "9999-99-99",
  owner: undefined,
  team_one: {
    score: 4,
    logo: "https://cdn.usevizor.com/default_logo.png",
    name: "Phoenix",
    show_logo: true,
    color: {
      bg: "rgb(142, 28, 28)",
      text: "rgb(255, 255, 255)",
    },
  },
  team_two: {
    score: 5,
    logo: "https://cdn.usevizor.com/default_logo.png",
    show_logo: true,
    name: "Sentinels",
    color: {
      bg: "rgb(30, 61, 159)",
      text: "rgb(255, 255, 255)",
    },
  },
  scoreboard: {
    theme: "default",
    dark: true,
    show_heading: true,
    show_subheading: true,
    premium: false,
    sponsors: false,
  },
});

let newMatch2 = reactive({
  id: "000",
  heading: "VIZOR Invitational 2022",
  subheading: "Best of 7",
  status: "active",
  created_at: "9999-99-99",
  owner: undefined,
  team_one: {
    score: 4,
    logo: "https://cdn.usevizor.com/default_logo.png",
    name: "Phoenix",
    show_logo: true,
    color: {
      bg: "rgb(142, 28, 28)",
      text: "rgb(255, 255, 255)",
    },
  },
  team_two: {
    score: 5,
    logo: "https://cdn.usevizor.com/default_logo.png",
    show_logo: true,
    name: "Sentinels",
    color: {
      bg: "rgb(30, 61, 159)",
      text: "rgb(255, 255, 255)",
    },
  },
  scoreboard: {
    theme: "default",
    dark: false,
    show_heading: true,
    show_subheading: true,
    premium: false,
    sponsors: false,
  },
});
</script>

<template>
  <section id="hero" class="bg-gray-950 py-48 flex justify-center">
    <div class="flex justify-between w-3/4 max-w-[100rem]">
      <div class="w-1/2 pr-8">
        <img src="@/assets/logo-long.svg" alt="Vizor Logo" class="w-48 mb-12" />
        <h1 class="text-white text-5xl pr-3">
          Add a scoreboard to your stream in 2 minutes.
        </h1>
        <p class="py-8 text-lg">
          VIZOR is a fully dynamic scoreboard that offers tournament admins easy-to-use
          and customizable scoreboard overlays, with the ability to control from a Web
          Browser.
        </p>
        <router-link to="/signup" tag="button" class="btn btn-primary">
          Create an Overlay
        </router-link>
      </div>

      <div class="w-1/2 flex flex-col justify-center">
        <scoreboard-default :localMatchData="newMatch" />
        <br />
        <scoreboard-default :localMatchData="newMatch2" />
      </div>
    </div>
  </section>
</template>
