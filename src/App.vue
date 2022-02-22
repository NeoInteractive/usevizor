<script setup>
import { ref } from "vue";
import { getUserState } from "@/firebase";
import Navbar from "@/components/Navbar.vue";
import Loading from "@/components/Loading.vue";
import Footer from "@/components/Footer.vue";

const isLoading = ref(true);
getUserState().then(() => {
  isLoading.value = false;
});
</script>
<template>
  <div
    v-if="isLoading"
    class="flex items-center justify-center"
    style="height: 80vh"
  >
    <Loading class="h-16 w-16" />
  </div>
  <div id="app-container" v-else class="flex flex-col">
    <Navbar />
    <router-view class="min-h-screen pb-12" v-slot="{ Component, route }">
      <transition name="slide" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
    <Footer />
  </div>
</template>

<style scoped>
#app-container {
  background: url(@/assets/blobs.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
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
