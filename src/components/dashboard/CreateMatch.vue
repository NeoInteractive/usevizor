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
      <h1 class="">Create Match</h1>
      <p class="">{{ matches.length }} / ∞&ensp;Created</p>
    </div>
    <div class="flex flex-row">
      <div
        class="w-full bg-gray-950 border border-gray-500 flex flex-col justify-between rounded-md"
      >
        <div
          class="p-4 bg-gradient-to-r from-gray-900 via-gray-925 to-gray-950 border-b border-gray-500"
        >
          <h2>New Match</h2>
          <p>Creating a new Match will use one of your...</p>
        </div>

        <div class="px-7 mt-6">
          <h3>General Options</h3>
          <hr class="border-gray-500" />
        </div>

        <div class="flex flex-row px-8 py-2">
          <div class="w-1/2">
            <h3 class="text-indigo-100 mb-2">Heading</h3>
            <p class="text-xs w-72 opacity-90">
              Give a name for your match. Keep this to less than 30 characters.
            </p>
          </div>
          <div class="w-1/2 flex justify-center">
            <input
              type="text"
              placeholder="VIZOR Invitational"
              class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
            />
          </div>
        </div>
        <div class="flex flex-row p-8">
          <div class="w-1/2">
            <h3 class="text-indigo-100 mb-2">Subheading</h3>
            <p class="text-xs w-72 opacity-90">
              Very short description of your match type.
            </p>
          </div>
          <div class="w-1/2 flex justify-center">
            <input
              type="text"
              placeholder="Best of 7"
              class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
            />
          </div>
        </div>
        <div class="px-7 mt-6">
          <h3>Team One</h3>
          <hr class="border-gray-500" />
        </div>

        <div class="flex flex-row px-8 py-2">
          <div class="w-1/2">
            <h3 class="text-indigo-100 mb-2">Name</h3>
            <p class="text-xs w-72 opacity-90">
              This is pretty self explanatory.
            </p>
          </div>
          <div class="w-1/2 flex justify-center">
            <input
              type="text"
              placeholder="VIZOR Invitational"
              class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
            />
          </div>
        </div>
        <div class="flex flex-row p-8">
          <div class="w-1/2">
            <h3 class="text-indigo-100 mb-2">Text & Color</h3>
            <p class="text-xs w-72 opacity-90">
              Choose a team color for Team One.
            </p>
          </div>
          <div class="w-1/2 flex justify-center">
            <input
              type="text"
              placeholder="Best of 7"
              class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
            />
          </div>
        </div>
        <div class="flex flex-row p-8">
          <div class="w-1/2">
            <h3 class="text-indigo-100 mb-2">Image</h3>
            <p class="text-xs w-72 opacity-90">
              A direct link (URL) to this team's logo. Square logos are
              <strong>highly</strong> recommended.
            </p>
          </div>
          <div class="w-1/2 flex justify-center">
            <input
              type="text"
              placeholder="Best of 7"
              class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.btn {
  @apply py-2 px-4 ml-2 font-heading rounded bg-indigo-500 text-white;
}
</style>
