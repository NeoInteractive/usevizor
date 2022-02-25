<template>
  <div class="bg-gray-925 pt-24">
    <div class="t-main-set flex-1 grid place-items-center">
      <section
        class="p-12 bg-gray-950/25 w-1/2 rounded backdrop-blur-sm border border-gray-925"
      >
        <form @submit.prevent="handleSubmit" class="t-auth-form text-white">
          <h1 class="mb-6">Sign Up</h1>
          <hr />
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2" for="email">
              <font-awesome-icon :icon="['fas', 'envelope']" class="mr-1" />
              Email
            </label>
            <input
              class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2 text-white"
              :class="`${!validEmail && 'border border-error'}`"
              type="email"
              id="email"
              placeholder="Email"
              v-model="state.email"
              required
            />
            <p class="mt-0.5 text-error text-xs italic" v-show="!validEmail">
              Enter Valid Email
            </p>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2" for="name">
              <font-awesome-icon :icon="['fas', 'user-circle']" class="mr-1" />
              Display Name
            </label>
            <input
              class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
              type="text"
              id="name"
              placeholder="Display Name"
              v-model="state.displayName"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2" for="password">
              <font-awesome-icon :icon="['fas', 'key']" class="mr-1" />
              Password
            </label>
            <input
              class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
              type="password"
              id="password"
              placeholder="Password"
              v-model="state.password"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2" for="cpassword">
              <font-awesome-icon :icon="['fas', 'key']" class="mr-1" />
              Confirm Password
            </label>
            <input
              class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
              :class="`${!equalPassword && 'border border-error'}`"
              type="password"
              id="cpassword"
              placeholder="Confirm Password"
              v-model="state.cpassword"
            />
            <p class="mt-0.5 text-error text-xs italic" v-show="!equalPassword">
              Password and Confirm Password doesn't match.
            </p>
          </div>
          <div class="flex justify-between items-center">
            <button
              type="submit"
              class="t-btn inline-flex items-center bg-primary"
            >
              <Loading class="h-5 w-5" v-if="loading" />
              <font-awesome-icon
                :icon="['fas', 'user-plus']"
                class="mr-2"
                v-else
              />
              Sign Up
            </button>
            <h5 class="mr-1">
              Already Signed Up?
              <router-link :to="{ name: 'Login' }" class="text-primary">
                Login
              </router-link>
            </h5>
          </div>

          <div v-if="error.length > 0" class="mt-4 p-4 bg-error rounded">
            {{ error }}
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { reactive, toRefs, computed, ref } from "vue";
import Loading from "@/components/Loading.vue";
import { isValidEmail } from "@/helpers";
const auth = getAuth();
const router = useRouter();

const state = reactive({
  email: "",
  displayName: "",
  password: "",
  cpassword: "",
});

const loading = ref(false);
const error = ref("");

const validate = () => {
  if (
    !isValidEmail(state.email) ||
    state.displayName.length <= 3 ||
    state.password.length < 6 ||
    state.password !== state.cpassword
  )
    return false;
  return true;
};

const equalPassword = computed(() =>
  state.cpassword.length > 0 ? state.password === state.cpassword : true
);
const validEmail = computed(() =>
  state.email.length > 1 ? isValidEmail(state.email) : true
);

const handleSubmit = async () => {
  loading.value = true;
  if (validate()) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );
      await updateProfile(user, {
        displayName: state.displayName,
      });
      await router.replace({ name: "Dashboard" });
    } catch (e) {
      handleFirebaseErrors(e);
    }
  } else {
    error.value =
      "Make sure your email id is valid, Display Name is more than 4 characters, Password is more than 5 characters and Password and Confirm Password are same";
  }
  loading.value = false;
};

const handleFirebaseErrors = (e) => {
  const msg = e.message;
  let usrMsg = "";
  if (msg.includes("auth/email-already-in-use")) {
    usrMsg = "Email already in use. Did you mean to log in?";
  }
  error.value = usrMsg;
};
</script>
