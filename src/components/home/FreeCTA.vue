<template>
  <div
    id="cta-free"
    class="bg-gray-975 py-24 px-1 flex justify-center h-100 border-y border-indigo-400"
  >
    <div class="container xl:w-1/2 lg:w-3/4 mx-auto text-center">
      <h1 class="text-4xl text-indigo-100">Create a Match for Free</h1>
      <p class="mt-6 text-lg">
        VIZOR is always free to use with our default scoreboard layouts. Create your first
        match today and get a 7-day free trail of
        <router-link to="/pro" class="text-amber-300 underline"> VIZOR Pro</router-link>
        that unlocks new themes, team logos, and more.
      </p>
      <router-link tag="button" to="/pro" class="btn btn-ghost btn-small mt-6 mr-2">
        What is VIZOR Pro?
      </router-link>
      <router-link tag="button" to="/auth/signup" class="btn btn-primary btn-small mt-6">
        <i class="fa-solid fa-plus mr-2"></i>Create a Free Match
      </router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
