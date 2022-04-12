<script setup>
import hero from "../components/home/Hero.vue";
import createMatch from "../components/home/FreeCTA.vue";
</script>
<template>
  <hero />
  <create-match />
  <section class="bg-gray-925 py-24 flex justify-center">
    <div class="flex justify-between w-3/4 max-w-[100rem]">
      <div class="w-full pr-8">
        <h1 class="text-white text-4xl text-center pr-3">Features</h1>
        <p class="text-white text-lg text-center">Power to the scoreboard.</p>
      </div>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
code {
  @apply bg-gray-800 px-2 mx-2;
}
#hero-demo {
  background: url("https://raw.githubusercontent.com/emkelley/usevizor/main/demo.gif")
    no-repeat center center;
  background-size: cover;
}
</style>
