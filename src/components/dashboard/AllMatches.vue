<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useStore } from "@/stores/user.store";

let matches = ref([]);
let user = ref(null);

const getMatchData = () => {
  const { auth_data } = useStore();
  const user = auth_data;
  if (user) {
    const q = query(collection(db, "matches"), where("owner", "==", user.uid));
    const m = [];
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((match) => m.push(match.data()));
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
    <div class="flex flex-row justify-between mb-8 items-center">
      <h1 class="">My Matches</h1>
      <button class="btn">Create Match</button>
    </div>
    <div class="flex flex-row">
      <div
        v-for="match in matches"
        :key="match.id"
        class="w-1/3 h-28 bg-gray-950 border border-gray-500 p-4 flex flex-col justify-between cursor-pointer hover:bg-gray-925 hover:border-indigo-400 transition rounded-md"
      >
        <h1 class="text-sm">{{ match.heading }}</h1>
        <h1 class="text-xs font-light text-indigo-100">
          Match ID: {{ match.id }}
        </h1>
      </div>
    </div>
  </div>
</template>
<style>
.btn {
  @apply py-2 px-4 ml-2 font-heading rounded bg-indigo-500 text-white;
}
</style>
