<script setup>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Loading from "@/components/Loading.vue";
import { isValidEmail } from "@/helpers";
import { useStore } from "@/stores/user.store";

const auth = getAuth();
const router = useRouter();
const userStore = useStore();
console.log(userStore.auth_data);
const loading = ref(false);
const error = ref("");

const handleSubmit = async (e) => {
  loading.value = true;
  const { email, password } = e.target.elements;
  if (
    email.value.length > 0 &&
    password.value.length > 0 &&
    isValidEmail(email.value)
  ) {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((user) => {
        console.log(user.user);
        userStore.setAuthData(user.user);
        router.replace({ name: "Dashboard" });
      })
      .catch((error) => {
        console.log(error);
        error.value = error.message;
      });
  } else {
    error.value = "Enter valid Email and Password";
  }
  loading.value = false;
};
</script>

<template>
  <div class="t-main-set flex-1 grid place-items-center">
    <section
      class="p-12 bg-gray-925/25 w-1/2 rounded backdrop-blur-sm border border-gray-925"
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
            type="password"
            id="password"
            placeholder="********"
            class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
          />
        </div>
        <div class="flex justify-between items-center">
          <button
            type="submit"
            class="t-btn inline-flex items-center bg-primary"
          >
            <Loading class="h-5 w-5" v-if="loading" />
            <font-awesome-icon
              :icon="['fas', 'sign-in-alt']"
              class="mr-2"
              v-else
            />
            Login
          </button>
          <!-- <h5 class="mr-1">
          Don't have an account?
          <router-link :to="{ name: 'SignUp' }" class="text-primary"
            >Sign Up
          </router-link>
        </h5> -->
        </div>
        <h5 class="mt-5 text-error">
          <router-link :to="{ name: 'ForgotPassword' }"
            >Forgot Password?
          </router-link>
        </h5>
        <div v-if="error.length > 0" class="mt-4 p-4 bg-error rounded">
          {{ error }}
        </div>
      </form>
    </section>
  </div>
</template>
