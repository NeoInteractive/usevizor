<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useStore } from "@/stores/user.store";
import { useRouter } from "vue-router";
const router = useRouter();
let matches = ref([]);
let user = ref(null);
let noMatches = ref(false);
let deleteMode = ref(false);
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

const deleteMatch = async (id) => {
  await deleteDoc(doc(db, "matches", id));
  getMatchData();
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
      class="flex flex-row justify-between items-center px-4 py-12 border-b border-gray-500 bg-gradient-to-r from-gray-900 via-gray-925 to-gray-950"
    >
      <h1 class="text-white tracking-wide font-normal text-2xl">My Matches</h1>
      <div>
        <code class="">{{ matches.length }} / 1 </code>
        <span class="tooltip tooltip-top mr-6" data-tip="Free matches created">
          <i class="fa-duotone fa-circle-question"></i>
        </span>
        <button @click="emit('createMatch')" class="btn btn-sm">
          <i class="fa-solid fa-plus"></i>
        </button>
        <button
          @click="deleteMode = !deleteMode"
          class="py-1 px-4 rounded text-red-400"
        >
          <i v-show="!deleteMode" class="fa-solid fa-trash"></i>
          <i v-show="deleteMode" class="fa-solid fa-check"></i>
        </button>
      </div>
    </div>
    <div
      v-if="matches.length > 0"
      class="flex flex-row flex-wrap px-4 border-r p-8"
    >
      <article
        v-for="match in matches"
        :key="match.id"
        class="sm:w-full lg:w-1/2 xl:w-1/3 p-2"
      >
        <span
          v-if="deleteMode"
          class="bg-red-400 text-white px-2 py-1 rounded-t text-xs font-semibold uppercase tracking-widest cursor-pointer"
          @click="deleteMatch(match.id)"
        >
          Delete
        </span>
        <div
          @click="router.replace(`/dashboard/m/${match.id}`)"
          class="h-28 bg-gray-200 border border-gray-500 p-4 flex flex-col justify-between cursor-pointer hover:bg-gray-925 hover:border-indigo-400 transition active:bg-violet-700"
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
      </article>
    </div>
    <div v-if="noMatches" class="px-4 p-8 text-center py-24">
      <h3 class="text-white">You haven't created any matches yet.</h3>
      <button @click="emit('createMatch')" class="btn btn-sm mt-6">
        Create Match
      </button>
    </div>
  </div>
</template>
<style></style>
