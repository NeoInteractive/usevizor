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
let newMatch = reactive({
  id: nanoid(),
  heading: "Title",
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
    show_subheading: true,
    premium: false,
    sponsors: false,
  },
});

const createNewMatch = async () => {
  if (matches.value.length >= 5) {
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
      class="flex flex-row justify-between border-b-0 items-center bg-gray-950 p-4 border-b border-r border-gray-600 bg-gradient-to-r from-gray-900 via-gray-925 to-gray-950"
    >
      <h1 class="text-white tracking-wide font-normal text-xl">
        Create a New Match
      </h1>
      <div>
        <code
          v-if="matches"
          :class="{ 'text-red-500 font-bold': matches.length == 5 }"
          >{{ matches.length }} / 5
        </code>
        <span class="tooltip tooltip-top mr-6" data-tip="Free matches created">
          <i class="fa-duotone fa-circle-question"></i>
        </span>
      </div>
    </div>
    <div class="flex flex-row">
      <div
        class="w-full bg-gray-950 border border-gray-500 flex flex-col justify-between"
      >
        <scoreboard-default :localMatchData="newMatch" />

        <div class="px-7 mt-6">
          <h3>General Options</h3>
          <hr class="border-gray-500" />
        </div>

        <div class="flex flex-row px-8 py-2 mb-6">
          <div class="w-1/2">
            <h3 class="text-indigo-100 mb-2">Pricing Plan</h3>
          </div>
          <div class="w-1/2 flex flex-col justify-center">
            <select
              v-model="newMatch.scoreboard.premium"
              name="bg-color"
              id="bg-color"
              class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
            >
              <option :value="false" selected>Free</option>
              <option disabled :value="true">Pro</option>
            </select>
          </div>
        </div>
        <div class="flex flex-row px-8 py-2">
          <div class="w-1/2">
            <h3 class="text-indigo-100 mb-2">Heading</h3>
            <p class="text-xs w-72 opacity-90">
              Give a name for your match. Keep this to less than 30 characters.
            </p>
          </div>
          <div class="w-1/2 flex flex-col justify-center">
            <input
              v-model="newMatch.heading"
              type="text"
              placeholder="VIZOR Invitational"
              class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
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
        <div class="flex flex-row p-8">
          <div class="w-1/2">
            <h3 class="text-indigo-100 mb-2">Subheading</h3>
            <p class="text-xs w-72 opacity-90">
              Very short description of your match type.
            </p>
          </div>
          <div class="w-1/2 flex flex-col justify-center">
            <input
              v-model="newMatch.subheading"
              type="text"
              placeholder="Best of 7"
              class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
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
        <div class="flex flex-row p-8">
          <div class="w-1/2">
            <h3 class="text-indigo-100 mb-2">Base Theme</h3>
            <p class="text-xs w-72 opacity-90">
              Choose a base theme for the scoreboard.
            </p>
          </div>
          <div class="w-1/2 flex justify-center">
            <select
              v-model="newMatch.scoreboard.theme"
              class="select w-full select-bordered"
            >
              <option disabled>----</option>
              <option selected value="default">Free</option>
            </select>
          </div>
        </div>
        <div class="flex flex-row p-8">
          <div class="w-1/2">
            <h3 class="text-indigo-100 mb-2">Variant</h3>
            <p class="text-xs w-72 opacity-90">
              Choose between a dark or light variant. Some Pro scoreboards may
              have additional variants.
            </p>
          </div>
          <div class="w-1/2 flex">
            <label class="swap swap-rotate">
              <input v-model="newMatch.scoreboard.dark" type="checkbox" />
              <svg
                class="swap-off fill-current w-10 h-10 text-amber-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                />
              </svg>
              <svg
                class="swap-on fill-current w-10 h-10 text-indigo-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                />
              </svg>
            </label>
          </div>
        </div>
        <div class="flex flex-row p-8">
          <div class="w-1/2">
            <h3 class="text-indigo-100 mb-2">
              <span class="badge badge-secondary badge-sm mr-2">Pro</span>
              Sponsors
            </h3>
            <p class="text-xs w-72 opacity-90">
              Coming Soon. Enable rotating Sponsor blocks on the scoreboard.
            </p>
          </div>
          <div class="w-1/2 flex">
            <div class="form-control">
              <label class="cursor-pointer label">
                <input
                  type="checkbox"
                  class="toggle toggle-secondary toggle-md"
                  disabled
                />
              </label>
            </div>
          </div>
        </div>
        <!-- -->
        <!-- TEAM ONE -->
        <!-- -->
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
              v-model="newMatch.team_one.name"
              type="text"
              placeholder="Phoenix"
              class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
            />
          </div>
        </div>
        <div class="flex flex-row p-8">
          <div class="w-1/2">
            <h3 class="text-indigo-100 mb-2">Team Logo</h3>
            <p class="text-xs w-72 opacity-90">
              A direct link (URL) to this team's image logo. Square logos are
              <strong>highly</strong> recommended. If no link is provided, a
              default logo will be used.
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
            <p class="text-xs w-72 opacity-90">
              Choose a text color for Team One.
            </p>
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
        <!-- -->
        <!-- TEAM TWO -->
        <!-- -->
        <div class="px-7 mt-6">
          <h3>Team Two</h3>
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
              v-model="newMatch.team_two.name"
              type="text"
              placeholder="Sentinels"
              class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
            />
          </div>
        </div>
        <div class="flex flex-row p-8">
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
            <p class="text-xs w-72 opacity-90">
              Choose a text color for Team two.
            </p>
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
          <button @click="createNewMatch" class="btn btn-wide">
            Create Match
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.btn {
  @apply py-2 px-4 ml-2 font-heading rounded bg-indigo-500 text-white;
}
.color-input.user .box {
  width: 100px;
  height: 48px;
  border-radius: 4px;
}
</style>
