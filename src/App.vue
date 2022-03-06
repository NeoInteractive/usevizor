<script setup>
import { ref } from "vue";
import { getUserState } from "@/firebase";
import Navbar from "@/components/Navbar.vue";
import Loading from "@/components/Loading.vue";
import Footer from "@/components/Footer.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isLoading = ref(true);

getUserState().then(() => {
  isLoading.value = false;
});
</script>
<template>
  <!-- <aside v-if="route.meta.has_nav" class="bg-indigo-900 text-center py-2">
    <p>
      VIZOR is currently under active development. While we'll do our best not
      to break things, just know it may happen at times.
    </p>
  </aside> -->
  <div
    v-if="isLoading"
    class="flex items-center justify-center"
    style="height: 80vh"
  >
    <Loading class="h-16 w-16" />
  </div>
  <div id="app-container" v-else class="flex flex-col">
    <Navbar v-if="route.meta.has_nav" />
    <router-view class="min-h-screen pb-12" v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </router-view>
    <Footer v-if="route.meta.has_foot" />
  </div>
</template>

<style scoped>
.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.2s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-30%);
  opacity: 0;
}
</style>
