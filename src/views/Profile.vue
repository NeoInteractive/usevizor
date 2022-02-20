<script setup>
import { useAuthState } from "@/firebase";
import Dialog from "@/components/Dialog.vue";
import { getGravatar } from "@/helpers";
const { user } = useAuthState();
</script>
<template>
  <div class="container-2xl mx-auto w-2/3 mt-12">
    <section
      class="bg-gray-925/25 rounded backdrop-blur-sm border border-gray-700"
    >
      <div class="flex flex-row">
        <div class="w-64 border-r border-indigo-500">
          <div class="flex flex-col flex-wrap px-4 py-4">
            <p
              class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer"
            >
              <i class="fa-solid fa-user-astronaut mr-2"></i> Account Info
            </p>
            <p
              class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer"
            >
              <i class="fa-solid fa-file-certificate mr-2"></i>My License
            </p>
            <p
              class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer"
            >
              <i class="fa-solid fa-puzzle-piece mr-2"></i>Products
            </p>
            <p
              class="mb-6 hover:text-indigo-400 hover:font-bold transition hover:cursor-pointer"
            >
              <i class="fa-solid fa-code mr-2"></i>Developer Tools
            </p>
          </div>
        </div>
        <div v-if="user" class="w-full p-4">
          <img
            v-if="user.email"
            :src="getGravatar(user.email)"
            class="w-16 rounded-full mb-4"
            alt=""
          />
          <h1>{{ user.displayName }}</h1>
          <h3 class="text-sm mb-12">{{ user.email }}</h3>

          <Dialog
            button-name="About VIZOR"
            title="About VIZOR"
            description="VIZOR is a fully dynamic scoreboard that offers tournament admins easy-to-use and customizable scoreboard overlays, with the ability to control from a Web Browser, OBS Dock, or our Stream Deck Plugins."
            :icon="['fas', 'info-circle']"
          />
        </div>
      </div>
    </section>
  </div>
</template>
