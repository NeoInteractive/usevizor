<script setup></script>
<template>
  <section id="hero" class="bg-indigo-900 py-48 flex justify-center">
    <div class="flex justify-between w-3/4 max-w-[100rem]">
      <div class="w-1/2 pr-8">
        <img src="@/assets/logo-long.svg" alt="Vizor Logo" class="w-48 mb-12" />
        <h1 class="text-white text-5xl pr-3">
          Add a scoreboard to your stream in 2 minutes.
        </h1>
        <p class="py-8 text-lg">
          VIZOR is a fully dynamic scoreboard that offers tournament admins
          easy-to-use and customizable scoreboard overlays, with the ability to
          control from a Web Browser.
        </p>
        <router-link to="/auth/signup" tag="button" class="btn btn-secondary">
          Create an Overlay
        </router-link>
      </div>

      <div
        id="hero-demo"
        class="bg-gray-900 w-1/2 aspect-[21/9] p-4 -skew-y-6 transform-gpu rounded-xl shadow-xl"
      ></div>
    </div>
  </section>
  <main class="bg-gray-900">
    <div class="flex justify-center">
      <section
        class="py-48 bg-gray-925/25 w-1/3 rounded backdrop-blur-sm border border-gray-925"
      ></section>
    </div>
  </main>
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
