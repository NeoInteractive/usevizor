<script setup>
import { ref, onMounted } from "vue";
import { isValidEmail } from "../helpers";
import axios from "axios";
import Botpoison from "@botpoison/browser";
import { useRouter } from "vue-router";

import { useAuthState } from "@/firebase";
const { user } = useAuthState();

let email = ref("");
let loading = ref(false);
const poison = new Botpoison({
  publicKey: "pk_5bbce72f-525d-4a56-b386-75b7fe7fedda",
});
const router = useRouter();

const submitForm = async () => {
  loading.value = true;
  try {
    const { solution } = await poison.challenge();
    await axios.post("https://submit-form.com/E4wnaOxe", {
      email: email.value,
      _botpoison: solution,
    });
    email.value = "";
    window.location.replace("/beta/registered");
  } catch (error) {
    email.value = "";
    alert("Oops! There was a problem submitting your form");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (user) router.push("/dashboard");
});
</script>
<template>
  <div class="t-main-set flex-1 grid place-items-center">
    <section
      class="p-12 bg-gray-925/25 w-1/2 rounded backdrop-blur-sm border border-gray-925"
    >
      <img src="@/assets/logo-long.svg" alt="Vizor Logo" class="w-48 mb-12" />
      <h1 class="text-4xl mb-6">
        Add a scoreboard to your tournament in 3 minutes.
      </h1>
      <p class="text-xl font-light mb-6">
        VIZOR is a fully dynamic scoreboard that offers tournament admins
        easy-to-use and customizable scoreboard overlays, with the ability to
        control from a Web Browser, OBS Dock, or our Stream Deck Plugins.
      </p>
      <p class="text-xl font-light mb-6">
        We’re currently in Closed Beta. If you’re interested in joining the
        beta, register for access below and we'll send you an email when you're
        in.
      </p>
      <form @submit.prevent="submitForm">
        <input
          type="hidden"
          name="_webhook"
          value="https://api.usevizor.com/hooks/beta"
        />
        <input
          type="hidden"
          name="_next"
          value="https://api.usevizor.com/beta/registered"
        />
        <div class="flex mb-2">
          <input
            v-model="email"
            type="email"
            name="email"
            class="w-full bg-gray-925 text-white px-2 py-3"
            placeholder="Email Address"
          />
          <button
            class="py-2 px-4 bg-indigo-500 hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            :disabled="!isValidEmail(email)"
          >
            <i v-if="loading" class="fa-solid fa-spinner fa-spin"></i>
            <span v-else>Register</span>
          </button>
        </div>
      </form>

      <p class="text-sm">
        Your email address is safe with us. We take the privacy of our users
        very seriously, and never sell customer information to anyone.
      </p>
    </section>
  </div>
</template>

<style lang="postcss" scoped>
code {
  @apply bg-gray-800 px-2 mx-2;
}
</style>
