<script setup>
import { onMounted } from "vue";
import Matches from "@/views/Match.vue";
import MyMatches from "@/components/dashboard/MyMatches.vue";
import CreateMatch from "@/components/dashboard/CreateMatch.vue";
import About from "@/components/dashboard/About.vue";
import Changelog from "@/components/dashboard/Changelog.vue";
import { useRoute, useRouter } from "vue-router";
import AuthedLayout from "@/layouts/authed.layout.vue";

const router = useRouter();
const route = useRoute();
const page = route.params.page;
const match = route.params.id;

onMounted(() => {
  console.log(page);
});
</script>
<template>
  <authed-layout>
    <matches v-if="match" />
    <my-matches v-if="page == 'all'" @create-match="router.push('/dashboard/create')" />
    <create-match v-if="page == 'create'" @create-match="router.push('/dashboard/all')" />
    <changelog v-if="page == 'changelog'" />
    <about v-if="page == 'about'" />
  </authed-layout>
</template>
