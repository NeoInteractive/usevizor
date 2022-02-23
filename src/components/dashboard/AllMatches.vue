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
      <div>
        <button class="btn">Create Match</button>
      </div>
    </div>
    <div v-if="matches.length > 0" class="flex flex-row flex-wrap">
      <router-link
        tag="div"
        :to="`/dashboard/m/${match.id}`"
        v-for="match in matches"
        :key="match.id"
        class="w-1/3 h-28 bg-gray-950 border border-gray-500 p-4 flex flex-col justify-between cursor-pointer hover:bg-gray-925 hover:border-indigo-400 transition rounded-md m-2 active:bg-violet-700"
      >
        <div class="flex flex-row justify-between">
          <h1 class="text-sm">{{ match.heading }}</h1>
          <span v-if="match.scoreboard.premium" class="badge badge-secondary">
            Pro
          </span>
          <span v-else class="badge">Basic</span>
        </div>
        <h1 class="text-xs font-light text-indigo-100 opacity-70">
          {{ match.status }} | {{ match.id.toUpperCase() }}
        </h1>
      </router-link>
    </div>
    <div v-else class="py-36 text-center">
      <h3 class="text-white">
        You haven't created any matches yet. Create one from the left menu to
        view them here.
      </h3>
    </div>
  </div>
</template>
<style></style>
