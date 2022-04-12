<script setup>
import { ref, reactive, onMounted } from "vue";
import { db } from "@/firebase";
import { useToast } from "vue-toastification";
import { useStore } from "@/stores/user.store";
import { nanoid } from "nanoid";
import ScoreboardDefault from "@/components/scoreboards/ScoreboardDefault.vue";
import ColorInput from "vue-color-input";
import {
  doc,
  setDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  collection,
} from "firebase/firestore";

const emit = defineEmits(["createMatch"]);
const toast = useToast();
let matches = ref();
let user = ref(null);
let activeTab = ref(1);
let newMatch = reactive({
  id: nanoid(),
  heading: "",
  subheading: "",
  status: "active",
  created_at: serverTimestamp(),
  owner: undefined,
  team_one: {
    score: 0,
    logo: "https://cdn.usevizor.com/default_logo.png",
    name: "Team One",
    show_logo: true,
    color: {
      bg: "rgb(142, 28, 28)",
      text: "rgb(255, 255, 255)",
    },
  },
  team_two: {
    score: 0,
    logo: "https://cdn.usevizor.com/default_logo.png",
    show_logo: true,
    name: "Team Two",
    color: {
      bg: "rgb(30, 61, 159)",
      text: "rgb(255, 255, 255)",
    },
  },
  scoreboard: {
    theme: "default",
    dark: true,
    show_heading: true,
    show_subheading: false,
    premium: false,
    sponsors: false,
  },
});

const createNewMatch = async () => {
  // TODO: Check the user profile to see if they have free matches available
  if (matches.value.length >= 1) {
    window.scrollTo(0, 0);
    toast.error(
      "Your account has reached its free match limit. Delete a match to create a new one."
    );
    return;
  }
  newMatch.owner = user.value.uid;
  await setDoc(doc(db, "matches", newMatch.id), newMatch);
  toast.success("Created Match!");
  emit("matchCreated");
};

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
const loadDemoMatch = () => {
  newMatch = demoMatch;
};

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const { auth_data } = useStore();
  user.value = auth_data;
  getMatchData();
});
</script>

<template>
  <div>
    <div
      class="flex flex-row justify-between items-center bg-gray-950 px-4 py-12 border-b border-r border-gray-500 bg-gradient-to-r from-gray-900 via-gray-925 to-gray-950"
    >
      <h1 class="text-white tracking-wide font-normal text-2xl">Create Match</h1>
    </div>
    <div class="flex flex-col pt-3">
      <div class="flex flex-row justify-center">
        <ul class="steps steps-vertical w-48 max-h-80 border-r border-gray-500">
          <li class="step step-primary" :class="{ 'step-primary': activeTab >= 1 }">
            Match Options
          </li>
          <li class="step" :class="{ 'step-primary': activeTab >= 2 }">Team One</li>
          <li class="step" :class="{ 'step-primary': activeTab >= 3 }">Team Two</li>
          <li class="step" :class="{ 'step-primary': activeTab >= 4 }">Finish</li>
        </ul>
        <section v-show="activeTab == 1" id="matchOptions" class="py-6 px-8 w-2/3">
          <div class="flex flex-row py-2">
            <div class="w-1/2">
              <h3 class="text-indigo-100 mb-2">Heading</h3>
              <p class="text-xs w-72 opacity-90">
                Give a name for your match. Try to keep this less than 40 characters, with
                an absolute max of 56.
              </p>
            </div>
            <div class="w-1/2 flex flex-col justify-center">
              <input
                type="text"
                v-model="newMatch.heading"
                class="input input-bordered w-full max-w-xs"
              />
              <label class="cursor-pointer label w-52 opacity-70">
                <input
                  v-model="newMatch.scoreboard.show_heading"
                  type="checkbox"
                  class="toggle toggle-xs"
                  checked
                />
                <span class="label-text ml-2"> Visible on scoreboard?</span>
              </label>
            </div>
          </div>
          <div class="flex flex-row py-8">
            <div class="w-1/2">
              <h3 class="text-indigo-100 mb-2">Subheading</h3>
              <p class="text-xs w-72 opacity-90">
                A free-text line that spans the width of the scoreboard on the bottom.
              </p>
            </div>
            <div class="w-1/2 flex flex-col justify-center">
              <input
                type="text"
                v-model="newMatch.subheading"
                class="input input-bordered w-full max-w-xs"
              />
              <label class="cursor-pointer label w-52 opacity-70">
                <input
                  v-model="newMatch.scoreboard.show_subheading"
                  type="checkbox"
                  class="toggle toggle-xs"
                  checked
                />
                <span class="label-text ml-2"> Visible on scoreboard?</span>
              </label>
            </div>
          </div>
          <div class="flex flex-row py-8">
            <div class="w-1/2">
              <h3 class="text-indigo-100 mb-2">Base Theme</h3>
              <p class="text-xs w-72 opacity-90">
                Choose a base theme for the scoreboard.
              </p>
            </div>
            <div class="w-1/2 flex">
              <select
                v-model="newMatch.scoreboard.theme"
                class="select w-full select-bordered max-w-xs"
              >
                <option disabled>----</option>
                <option selected value="default">Default</option>
              </select>
            </div>
          </div>
          <div class="flex flex-row py-8">
            <div class="w-1/2">
              <h3 class="text-indigo-100 mb-2">Dark Mode</h3>
              <p class="text-xs w-72 opacity-90">Enable dark mode for the scoreboard.</p>
            </div>
            <div class="w-1/2 flex items-center">
              <input type="checkbox" class="toggle" v-model="newMatch.scoreboard.dark" />
            </div>
          </div>
          <div class="flex justify-center py-12">
            <button disabled @click="activeTab--" class="btn btn-sm btn-ghost mr-4">
              Back
            </button>
            <button @click="activeTab++" class="btn btn-sm btn-primary btn-wide">
              Next Step
            </button>
          </div>
        </section>
        <section v-show="activeTab == 2" id="teamOne" class="py-12">
          <h1 class="pb-8">Team One</h1>
          <div class="flex flex-row px-8 py-2">
            <div class="w-1/2">
              <h3 class="text-indigo-100 mb-2">Name</h3>
              <p class="text-xs w-72 opacity-90">This is pretty self explanatory.</p>
            </div>
            <div class="w-1/2 flex justify-center">
              <input
                v-model="newMatch.team_one.name"
                type="text"
                placeholder="Phoenix"
                class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
              />
            </div>
          </div>
          <div class="flex flex-row p-8">
            <div class="w-1/2">
              <h3 class="text-indigo-100 mb-2">Team Logo Visibility</h3>
              <p class="text-xs w-72 opacity-90">
                Show or hide the team logo on the scoreboard.
              </p>
            </div>
            <div class="w-1/2 flex">
              <div class="form-control">
                <label class="cursor-pointer label">
                  <span class="label-text mr-8">Show logo?</span>
                  <input
                    v-model="newMatch.team_one.show_logo"
                    type="checkbox"
                    class="toggle"
                    checked
                  />
                </label>
              </div>
            </div>
          </div>
          <div
            class="flex flex-row p-8"
            :class="{ 'opacity-40': !newMatch.team_one.show_logo }"
          >
            <div class="w-1/2">
              <h3 class="text-indigo-100 mb-2">Team Logo</h3>
              <p class="text-xs w-72 opacity-90">
                A direct link (URL) to this team's image logo. Square logos are
                <strong>highly</strong> recommended.
              </p>
            </div>
            <div class="w-1/2 flex justify-center">
              <input
                v-model="newMatch.team_one.logo"
                type="text"
                placeholder="https://i.imgur.com/Q2Unw.gif"
                class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
              />
            </div>
          </div>
          <div class="flex flex-row p-8">
            <div class="w-1/2">
              <h3 class="text-indigo-100 mb-2">Background Color</h3>
              <p class="text-xs w-72 opacity-90">
                Choose a color for team one's background.
              </p>
            </div>
            <div class="w-1/2 flex justify-center">
              <div class="mr-4">
                <label for="bg-color">Color</label>
                <color-input
                  v-model="newMatch.team_one.color.bg"
                  format="rgb string"
                  class="h-12"
                />
              </div>
              <div class="w-full">
                <label for="bg-color">Value</label>
                <input
                  v-model="newMatch.team_one.color.bg"
                  type="text"
                  class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-row p-8">
            <div class="w-1/2">
              <h3 class="text-indigo-100 mb-2">Text Color</h3>
              <p class="text-xs w-72 opacity-90">Choose a text color for Team One.</p>
            </div>
            <div class="w-1/2 flex justify-center">
              <div class="mr-4">
                <label for="bg-color">Color</label>
                <color-input
                  v-model="newMatch.team_one.color.text"
                  format="rgb string"
                  class="h-12"
                />
              </div>
              <div class="w-full">
                <label for="text-color">Value</label>
                <input
                  v-model="newMatch.team_one.color.text"
                  type="text"
                  class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-center py-12">
            <button @click="activeTab--" class="btn btn-sm btn-ghost mr-4">Back</button>
            <button @click="activeTab++" class="btn btn-sm btn-primary btn-wide">
              Next Step
            </button>
          </div>
        </section>
        <section v-show="activeTab == 3" id="teamTwo" class="py-12">
          <h1 class="pb-8">Team Two</h1>
          <div class="flex flex-row px-8 py-2">
            <div class="w-1/2">
              <h3 class="text-indigo-100 mb-2">Name</h3>
              <p class="text-xs w-72 opacity-90">This is pretty self explanatory.</p>
            </div>
            <div class="w-1/2 flex justify-center">
              <input
                v-model="newMatch.team_two.name"
                type="text"
                placeholder="Sentinels"
                class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
              />
            </div>
          </div>
          <div class="flex flex-row p-8">
            <div class="w-1/2">
              <h3 class="text-indigo-100 mb-2">Team Logo Visibility</h3>
              <p class="text-xs w-72 opacity-90">
                Show or hide the team logo on the scoreboard.
              </p>
            </div>
            <div class="w-1/2 flex">
              <div class="form-control">
                <label class="cursor-pointer label">
                  <span class="label-text mr-8">Show logo?</span>
                  <input
                    v-model="newMatch.team_two.show_logo"
                    type="checkbox"
                    class="toggle"
                    checked
                  />
                </label>
              </div>
            </div>
          </div>
          <div
            class="flex flex-row p-8"
            :class="{ 'opacity-40': !newMatch.team_two.show_logo }"
          >
            <div class="w-1/2">
              <h3 class="text-indigo-100 mb-2">Team Logo</h3>
              <p class="text-xs w-72 opacity-90">
                A direct link (URL) to this team's image logo. Square logos are
                <strong>highly</strong> recommended.
              </p>
            </div>
            <div class="w-1/2 flex justify-center">
              <input
                v-model="newMatch.team_two.logo"
                type="text"
                placeholder="https://i.imgur.com/Q2Unw.gif"
                class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
              />
            </div>
          </div>
          <div class="flex flex-row p-8">
            <div class="w-1/2">
              <h3 class="text-indigo-100 mb-2">Background Color</h3>
              <p class="text-xs w-72 opacity-90">
                Choose a color for team two's background.
              </p>
            </div>
            <div class="w-1/2 flex justify-center">
              <div class="mr-4">
                <label for="bg-color">Color</label>
                <color-input
                  v-model="newMatch.team_two.color.bg"
                  format="rgb string"
                  class="h-12"
                />
              </div>
              <div class="w-full">
                <label for="bg-color">Value</label>
                <input
                  v-model="newMatch.team_two.color.bg"
                  type="text"
                  class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-row p-8">
            <div class="w-1/2">
              <h3 class="text-indigo-100 mb-2">Text Color</h3>
              <p class="text-xs w-72 opacity-90">Choose a text color for Team two.</p>
            </div>
            <div class="w-1/2 flex justify-center">
              <div class="mr-4">
                <label for="bg-color">Color</label>
                <color-input
                  v-model="newMatch.team_two.color.text"
                  format="rgb string"
                  class="h-12"
                />
              </div>
              <div class="w-full">
                <label for="text-color">Value</label>
                <input
                  v-model="newMatch.team_two.color.text"
                  type="text"
                  class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-center py-12">
            <button @click="activeTab--" class="btn btn-sm btn-ghost mr-4">Back</button>
            <button @click="activeTab++" class="btn btn-sm btn-primary btn-wide">
              Next Step
            </button>
          </div>
        </section>
        <section v-show="activeTab == 4" id="finish" class="my-12 text-center">
          <button @click="activeTab--" class="btn btn-ghost mr-4">Back</button>
          <button @click="createNewMatch" class="btn btn-primary btn-wide">
            Create Match
          </button>
        </section>
      </div>
    </div>
  </div>
</template>
<style>
.color-input.user .box {
  width: 100px;
  height: 48px;
  border-radius: 4px;
}
</style>
