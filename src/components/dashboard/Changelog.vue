<script setup></script>

<template>
  <div>
    <div
      class="flex flex-row justify-between items-center bg-gray-950 py-12 p-4 border-b border-r border-gray-500 bg-gradient-to-r from-gray-900 via-gray-925 to-gray-950"
    >
      <h1 class="text-white tracking-wide font-normal text-2xl">Changelog</h1>
    </div>
    <div
      class="flex flex-col flex-wrap p-8 bg-gray-950 border-b border-r border-gray-500 min-h-[30rem]"
    >
      <article class="w-full mb-12">
        <h3
          class="text-bold text-indigo-100 border-b border-indigo-400 w-full pb-2 mb-4"
        >
          Version 1.1.1 Alpha
        </h3>
        <ul class="list-disc pl-8 text-gray-300">
          <li>Switch to full screen UI instead of boxed</li>
        </ul>
      </article>
      <article class="w-full mb-12">
        <h3
          class="text-bold text-indigo-100 border-b border-indigo-400 w-full pb-2 mb-4"
        >
          Version 1.1.0 Alpha
        </h3>
        <ul class="list-disc pl-8 text-gray-300">
          <li>Create up to 5 free matches per account</li>
          <li>Added color picker for team colors</li>
          <li>Live preview while creating match</li>
        </ul>
      </article>
      <article class="w-full">
        <h3
          class="text-bold text-indigo-100 border-b border-indigo-400 w-full pb-2 mb-4"
        >
          Version 1.0.0 Alpha
        </h3>
        <ul class="list-disc pl-8 text-gray-300">
          <li>Create a match</li>
          <li>Ability to add match overlay to OBS</li>
        </ul>
      </article>
    </div>
  </div>
</template>
<style></style>
