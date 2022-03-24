<script setup>
import { ref } from "vue";
import { db } from "@/firebase";
import { useRouter } from "vue-router";
import { isValidEmail } from "@/helpers";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useStore } from "@/stores/user.store";
import { useToast } from "vue-toastification";

import Loading from "@/components/Loading.vue";

const auth = getAuth();
const router = useRouter();
const userStore = useStore();
const loading = ref(false);
const toast = useToast();

let error = ref(undefined);
let email = ref("");
let password = ref("");

const handleSubmit = async () => {
  loading.value = true;
  error.value = undefined;
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((user) => {
      userStore.setAuthData(user.user);
      getUserProfileData(user.user.uid);
    })
    .catch((error) => {
      toast.error(error.message);
      error.value = error.message;
      email.value = "";
      password.value = "";
      loading.value = false;
    });
};

const getUserProfileData = async (userID) => {
  const docSnap = await getDoc(doc(db, "users", userID));
  userStore.setProfileData(docSnap.data());
  router.replace({ name: "Dashboard" });
  loading.value = false;
};

const loginFieldsValid = () => {
  return email.value.length > 0 && password.value.length > 0 && isValidEmail(email.value);
};
</script>

<template>
  <div class="bg-gray-925 pt-24">
    <div class="t-main-set flex-1 grid place-items-center">
      <section
        class="p-12 bg-gray-950/25 w-1/2 rounded backdrop-blur-sm border border-gray-925"
      >
        <form @submit.prevent="handleSubmit">
          <h1 class="mb-6">Login</h1>
          <hr />
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2" for="email">
              <font-awesome-icon :icon="['fas', 'envelope']" class="mr-1" />
              Email
            </label>
            <input
              v-model="email"
              type="text"
              id="email"
              placeholder="hello@usevizor.com"
              class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2" for="password">
              <font-awesome-icon :icon="['fas', 'key']" class="mr-1" />
              Password
            </label>
            <input
              v-model="password"
              type="password"
              id="password"
              placeholder="********"
              class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
            />
          </div>
          <div class="flex justify-center py-6">
            <button class="btn btn-primary btn-wide" :disabled="!loginFieldsValid()">
              <Loading class="h-5 w-5" v-if="loading" />
              <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="mr-2" v-else />
              Login
            </button>
            <!-- <h5 class="mr-1">
          Don't have an account?
          <router-link :to="{ name: 'SignUp' }" class="text-primary"
            >Sign Up
          </router-link>
        </h5> -->
          </div>
          <h5 class="mt-5 text-error text-right">
            <router-link :to="{ name: 'ForgotPassword' }">Forgot Password? </router-link>
          </h5>
          <div v-if="error" class="mt-8 p-4 bg-error rounded">
            {{ error }}
          </div>
        </form>
      </section>
    </div>
  </div>
</template>
