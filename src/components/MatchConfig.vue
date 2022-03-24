<script setup>
import { watch, ref, reactive, onMounted } from "vue";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useStore } from "@/stores/user.store";
import { nanoid } from "nanoid";

let matches = ref([]);
let user = ref(null);

let newMatch = reactive({
  id: nanoid(),
  heading: "VIZOR Tournament",
  subheading: "Best of 3",
  status: "Live",
  created_at: db.Timestamp,
  owner: user.uid,
  team_one: {
    score: 0,
    icon: "",
    name: "Phoenix",
    show_icon: true,
    color: {
      name: "red",
      shade: "800",
      class: "bg-red-800",
    },
  },
  team_two: {
    score: 0,
    icon: "",
    show_icon: true,
    name: "Sentinels",
    color: {
      name: "red",
      shade: "800",
      class: "bg-red-800",
    },
  },
  scoreboard: {
    show_subheading: false,
    premium: false,
    dark: true,
    show_heading: true,
    theme: "default",
    sponsors: false,
  },
});

// const createNewMatch = async () => {
//   await setDoc(doc(db, "cities", "LA"), {
//     name: "Los Angeles",
//     state: "CA",
//     country: "USA",
//   });
// };
const colors = reactive({
  team_one: "#ff2c3c",
  team_two: "#2300ff",
});

watch(colors, (currentValue, _oldValue) => {
  const team_one_preview = document.getElementById("team-one-color");
  const team_two_preview = document.getElementById("team-two-color");
  team_one_preview.style.backgroundColor = currentValue.team_one;
  team_two_preview.style.backgroundColor = currentValue.team_two;
});

onMounted(() => {
  const { auth_data } = useStore();
  user.value = auth_data;
  const team_one_preview = document.getElementById("team-one-color");
  const team_two_preview = document.getElementById("team-two-color");
  team_one_preview.style.backgroundColor = colors.team_one;
  team_two_preview.style.backgroundColor = colors.team_two;
});
</script>
<template>
  <div
    class="w-full bg-gray-950 border border-gray-500 flex flex-col justify-between rounded-md"
  >
    <div
      class="p-4 bg-gradient-to-r from-gray-900 via-gray-925 to-gray-950 border-b border-gray-500"
    >
      <h2>Match Config</h2>
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
          v-model="newMatch.heading"
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
          v-model="newMatch.subheading"
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
        <p class="text-xs w-72 opacity-90">This is pretty self explanatory.</p>
      </div>
      <div class="w-1/2 flex justify-center">
        <input
          v-model="newMatch.team_one.name"
          type="text"
          placeholder="VIZOR Invitational"
          class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
        />
      </div>
    </div>
    <div class="flex flex-row p-8">
      <div class="w-1/2">
        <h3 class="text-indigo-100 mb-2">Team Icon</h3>
        <p class="text-xs w-72 opacity-90">
          A direct link (URL) to this team's image icon. Square logos are
          <strong>highly</strong> recommended. If no link is provided, a default
          icon will be used.
        </p>
      </div>
      <div class="w-1/2 flex justify-center">
        <input
          v-model="newMatch.team_one.icon"
          type="text"
          placeholder="Best of 7"
          class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
        />
      </div>
    </div>
    <div class="flex flex-row p-8">
      <div class="w-1/2">
        <h3 class="text-indigo-100 mb-2">Background Color</h3>
        <p class="text-xs w-72 opacity-90">
          Enter a team color for Team One in hex format. You can use
          <a
            href="https://www.canva.com/colors/color-wheel/"
            target="_blank"
            rel="noreferrer"
            class="text-indigo-200"
            >this tool</a
          >
          to generate hex colors.
        </p>
      </div>
      <div class="w-1/2 flex justify-center">
        <div class="mr-4">
          <label for="bg-color">Preview</label>
          <div
            id="team-one-color"
            class="w-28 h-12 rounded border border-gray-500"
          ></div>
        </div>
        <div class="w-full">
          <label for="bg-color">Hex</label>
          <input
            v-model="colors.team_one"
            type="text"
            placeholder="#ff2c3c"
            class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-row p-8">
      <div class="w-1/2">
        <h3 class="text-indigo-100 mb-2">Text Color</h3>
        <p class="text-xs w-72 opacity-90">
          Enter a text color for Team One in hex format. You can use
          <a
            href="https://www.canva.com/colors/color-wheel/"
            target="_blank"
            rel="noreferrer"
            class="text-indigo-200"
            >this tool</a
          >
          to generate hex colors.
        </p>
      </div>
      <div class="w-1/2 flex justify-center">
        <div class="mr-4">
          <label for="bg-color">Preview</label>
          <div
            id="team-one-color"
            class="w-28 h-12 rounded border border-gray-500"
          ></div>
        </div>
        <div class="w-full">
          <label for="bg-color">Hex</label>
          <input
            v-model="colors.team_one"
            type="text"
            placeholder="#ffffff"
            class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
          />
        </div>
      </div>
    </div>

    <div class="px-7 mt-6">
      <h3>Team Two</h3>
      <hr class="border-gray-500" />
    </div>
    <div class="flex flex-row px-8 py-2">
      <div class="w-1/2">
        <h3 class="text-indigo-100 mb-2">Name</h3>
        <p class="text-xs w-72 opacity-90">This is pretty self explanatory.</p>
      </div>
      <div class="w-1/2 flex justify-center">
        <input
          v-model="newMatch.team_two.name"
          type="text"
          placeholder="VIZOR Invitational"
          class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
        />
      </div>
    </div>
    <div class="flex flex-row p-8">
      <div class="w-1/2">
        <h3 class="text-indigo-100 mb-2">Team Icon</h3>
        <p class="text-xs w-72 opacity-90">
          A direct link (URL) to this team's image icon. Square logos are
          <strong>highly</strong> recommended. If no link is provided, a default
          icon will be used.
        </p>
      </div>
      <div class="w-1/2 flex justify-center">
        <input
          v-model="newMatch.team_two.icon"
          type="text"
          placeholder="Best of 7"
          class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
        />
      </div>
    </div>
    <div class="flex flex-row p-8">
      <div class="w-1/2">
        <h3 class="text-indigo-100 mb-2">Background Color</h3>
        <p class="text-xs w-72 opacity-90">
          Enter a team color for Team two in hex format. You can use
          <a
            href="https://www.canva.com/colors/color-wheel/"
            target="_blank"
            rel="noreferrer"
            class="text-indigo-200"
            >this tool</a
          >
          to generate hex colors.
        </p>
      </div>
      <div class="w-1/2 flex justify-center">
        <div class="mr-4">
          <label for="bg-color">Preview</label>
          <div
            id="team-two-color"
            class="w-28 h-12 rounded border border-gray-500"
          ></div>
        </div>
        <div class="w-full">
          <label for="bg-color">Hex</label>
          <input
            v-model="colors.team_two"
            type="text"
            placeholder="#ff2c3c"
            class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-row p-8">
      <div class="w-1/2">
        <h3 class="text-indigo-100 mb-2">Text Color</h3>
        <p class="text-xs w-72 opacity-90">
          Enter a text color for Team two in hex format. You can use
          <a
            href="https://www.canva.com/colors/color-wheel/"
            target="_blank"
            rel="noreferrer"
            class="text-indigo-200"
            >this tool</a
          >
          to generate hex colors.
        </p>
      </div>
      <div class="w-1/2 flex justify-center">
        <div class="mr-4">
          <label for="bg-color">Preview</label>
          <div
            id="team-one-color"
            class="w-28 h-12 rounded border border-gray-500"
          ></div>
        </div>
        <div class="w-full">
          <label for="bg-color">Hex</label>
          <input
            v-model="colors.team_one"
            type="text"
            placeholder="#ffffff"
            class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
          />
        </div>
      </div>
    </div>
  </div>
</template>
