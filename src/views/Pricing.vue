<script setup>
import { ref } from "vue";
import PlanCard from "@/components/pricing/PlanCard.vue";
import vizorPlans from "@/config/plans";
let annual = ref(false);
</script>

<template>
  <div class="bg-gray-925 px-4 py-16">
    <div class="flex justify-center">
      <section class="max-w-96 py-12 px-4">
        <h1 class="mb-6 font-thin text-center text-6xl">Pricing</h1>
        <h2 class="mb-6 font-thin text-2xl text-center">
          Plans that scale with your needs
        </h2>
        <ul class="menu menu-horizontal bg-gray-800 rounded-box">
          <li @click="annual = false" :class="{ 'bg-indigo-600': !annual }">
            <a class="px-4 uppercase text-xs font-bold py-1">Monthly</a>
          </li>
          <li @click="annual = true" :class="{ 'bg-indigo-600': annual }">
            <a class="px-4 uppercase text-xs font-bold tracking-widest py-1">Annual</a>
          </li>
        </ul>
        <hr class="my-6 divide-slate-600" />
        <div class="flex flex-row justify-between">
          <section class="w-full p-2">
            <plan-card :annual="annual" :planData="vizorPlans[0]" />
          </section>
          <section class="w-full p-2">
            <plan-card :annual="annual" :planData="vizorPlans[1]" />
          </section>
          <section class="w-full p-2">
            <plan-card :annual="annual" :planData="vizorPlans[2]" />
          </section>
        </div>
      </section>
    </div>
  </div>
</template>
