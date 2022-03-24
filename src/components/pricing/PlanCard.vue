<script setup>
defineProps({
  planData: {
    type: Object,
  },
  annual: {
    type: Boolean,
  },
});
</script>

<template>
  <div
    :class="planData.bg"
    class="p-8 rounded-lg shadow-xl bg-gradient-to-br to-gray-925"
  >
    <label class="font-black text-md">{{ planData.plan_name }}</label>
    <div class="py-6">
      <span v-if="planData.price == 0" class="text-6xl font-black">FREE</span>
      <div v-else>
        <span class="text-6xl font-black"
          >${{ annual ? `${planData.price * 10}` : planData.price }}</span
        >
        <span class="text-md">/{{ annual ? "Year" : "Month" }}</span>
      </div>
    </div>
    <p v-for="feature in planData.features" :key="feature" class="py-1">
      <i class="fa-duotone fa-hexagon-check mr-1" /> {{ feature }}
    </p>
    <div class="flex justify-center items-center mt-6">
      <router-link tag="button" :to="{ name: 'Home' }" class="btn btn-primary btn-wide">
        Sign Up
      </router-link>
    </div>
  </div>
</template>
