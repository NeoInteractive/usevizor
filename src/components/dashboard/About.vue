<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useStore } from "@/stores/user.store";

let matches = ref([]);
let user = ref(null);
let noMatches = ref(false);
const emit = defineEmits(["createMatch"]);

const getMatchData = () => {
  const { auth_data } = useStore();
  const user = auth_data;
  if (user) {
    const q = query(collection(db, "matches"), where("owner", "==", user.uid));
    const m = [];
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((match) => m.push(match.data()));
      if (m.length === 0) noMatches.value = true;
      matches.value = m;
    });
  }
};

onMounted(() => {
  const { auth_data } = useStore();
  user.value = auth_data;
  getMatchData();
});
</script>

<template>
  <div>
    <div
      class="flex flex-row justify-between items-center bg-gray-950 p-4 border-b border-r border-gray-500 bg-gradient-to-r from-gray-900 via-gray-925 to-gray-950"
    >
      <h1 class="text-white tracking-wide font-normal text-xl">About VIZOR</h1>
    </div>
    <div
      v-if="matches.length > 0"
      class="flex flex-row flex-wrap p-8 bg-gray-950 border-b border-r border-gray-500 min-h-[30rem]"
    >
      <p>VIZOR was made with 💜 and ☕ byNeo Interactive</p>
    </div>
  </div>
</template>
<style></style>
