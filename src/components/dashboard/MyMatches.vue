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
      class="flex flex-row justify-between mb-8 items-center bg-gray-950 p-4 border-b border-r border-gray-600 bg-gradient-to-r from-gray-900 via-gray-925 to-gray-950"
    >
      <h1 class="text-white tracking-wide font-normal text-xl">My Matches</h1>
      <div>
        <code class="">{{ matches.length }} / 5 </code>
        <span class="tooltip tooltip-top mr-6" data-tip="Free matches created">
          <i class="fa-duotone fa-circle-question"></i>
        </span>
        <button @click="emit('createMatch')" class="btn btn-sm">
          <i class="fa-solid fa-plus"></i>
        </button>
        <button
          @click="emit('createMatch')"
          class="py-1 px-4 rounded text-red-400"
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
    <div v-if="matches.length > 0" class="flex flex-row flex-wrap px-4">
      <h2
        class="subheading w-full mb-6 text-sm tracking-widest text-indigo-400 font-bold uppercase"
      >
        Free Matches
      </h2>
      <router-link
        tag="div"
        :to="`/dashboard/m/${match.id}`"
        v-for="match in matches"
        :key="match.id"
        class="sm:w-full lg:w-1/2 xl:w-1/3 p-2"
        v-show="!match.scoreboard.premium"
      >
        <div
          class="h-28 bg-gray-950 border border-gray-500 p-4 flex flex-col justify-between cursor-pointer hover:bg-gray-925 hover:border-indigo-400 transition active:bg-violet-700"
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
        </div>
      </router-link>
      <h2
        class="subheading w-full mb-6 text-sm tracking-widest text-indigo-400 font-bold uppercase mt-12"
      >
        Premium Matches
      </h2>
      <router-link
        tag="div"
        :to="`/dashboard/m/${match.id}`"
        v-for="match in matches"
        :key="match.id"
        class="w-1/3 p-2"
        v-show="match.scoreboard.premium"
      >
        <div
          class="h-28 bg-gray-950 border border-gray-500 p-4 flex flex-col justify-between cursor-pointer hover:bg-gray-925 hover:border-indigo-400 transition active:bg-violet-700"
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
        </div>
      </router-link>
    </div>
    <div v-if="noMatches" class="py-36 text-center">
      <h3 class="text-white">You haven't created any matches yet.</h3>
      <button @click="emit('createMatch')" class="btn btn-sm mt-6">
        Create Match
      </button>
    </div>
  </div>
</template>
<style></style>
