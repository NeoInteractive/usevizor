<script setup>
import { ref } from "vue";
import PlanCard from "@/components/pricing/PlanCard.vue";
import vizorPlans from "@/config/plans";
let annual = ref(false);
</script>

<template>
  <div class="bg-gray-925 px-4 py-16">
    <div class="flex justify-center">
      <section class="2xl:w-2/3 w-full py-12">
        <h1 class="mb-6 font-thin text-center text-6xl">Pricing</h1>
        <h2 class="mb-6 font-thin text-2xl text-center">
          Plans that scale with your needs
        </h2>
        <ul class="menu menu-horizontal bg-gray-950 rounded-box">
          <li @click="annual = false"><a>Monthly</a></li>
          <li @click="annual = true"><a>Annual</a></li>
        </ul>
        <hr />
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
