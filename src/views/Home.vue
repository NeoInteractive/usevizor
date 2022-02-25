<script setup></script>
<template>
  <div class="bg-gray-950">
    <div class="t-main-set flex-1 grid place-items-center">
      <section
        class="pt-48 bg-gray-925/25 w-1/2 rounded backdrop-blur-sm border border-gray-925"
      >
        <img src="@/assets/logo-long.svg" alt="Vizor Logo" class="w-48 mb-12" />
        <h1 class="text-4xl mb-6">
          Add a scoreboard to your tournament in 3 minutes.
        </h1>
        <p class="text-xl font-light mb-6">
          VIZOR is a fully dynamic scoreboard that offers tournament admins
          easy-to-use and customizable scoreboard overlays, with the ability to
          control from a Web Browser. And soon, using an OBS Dock, or our Stream
          Deck Plugins.
        </p>
        <p class="text-xl font-light mb-6">
          We’re currently in Open Beta. If you’re interested in joining the
          beta, register for access using the button below and we'll send you an
          email to confirm your account.
        </p>
        <router-link tag="button" to="/auth/signup" class="btn">
          Create an Account
        </router-link>
      </section>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
code {
  @apply bg-gray-800 px-2 mx-2;
}
</style>
