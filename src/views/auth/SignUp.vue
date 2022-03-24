<script setup>
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter, useRoute } from "vue-router";
import { reactive, toRefs, computed, ref } from "vue";
import Loading from "@/components/Loading.vue";
import { isValidEmail } from "@/helpers";
const auth = getAuth();
const router = useRouter();

const state = reactive({
  email: "",
  displayName: "",
  plan: "free",
  password: "",
  cpassword: "",
});

const loading = ref(false);
const error = ref("");

const validate = () => {
  if (
    !isValidEmail(state.email) ||
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
      const id = user.uid;
      // await updateProfile(user, {
      //   displayName: state.displayName,
      // });
      await setDoc(doc(db, "users", id), {
        uid: id,
        pro: false,
        sid: "",
        verified: false,
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
<template>
  <div class="bg-gray-925 pt-24">
    <div class="t-main-set flex-1 grid place-items-center">
      <section
        class="p-12 bg-gray-950/25 w-1/2 rounded backdrop-blur-sm border border-gray-925"
      >
        <form @submit.prevent="handleSubmit" class="t-auth-form text-white">
          <h1 class="mb-6">Create an Account</h1>
          <p class="mb-6">Create an account to start your free trial.</p>
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
          <!-- <div class="mb-4 py-4">
            <h1 class="text-lg mb-2">Choose your Plan</h1>
            <article
              class="border p-4 text-white border-gray-500 rounded mb-4 cursor-pointer"
              @click="state.plan = 'free'"
              :class="state.plan === 'free' ? 'bg-gray-900' : 'bg-gray-950'"
            >
              <div class="flex justify-between items-center text-lg font-bold">
                <p class="font-bold">Community</p>
                <p class="font-bold">$0/mo</p>
              </div>
            </article>
            <article
              class="border border-gray-500 p-4 text-white rounded mb-4 cursor-pointer"
              @click="state.plan = 'hobby'"
              :class="state.plan === 'hobby' ? 'bg-indigo-900' : 'bg-gray-950'"
            >
              <div class="flex justify-between items-center text-lg font-bold">
                <p class="font-bold">Starter</p>
                <p class="font-bold">$10/mo</p>
              </div>
            </article>
            <article
              class="border border-gray-500 p-4 text-white rounded cursor-pointer"
              @click="state.plan = 'prod'"
              :class="state.plan === 'prod' ? 'bg-blue-900' : 'bg-gray-950'"
            >
              <div class="flex justify-between items-center text-lg font-bold">
                <p class="font-bold">Pro</p>
                <p class="font-bold">$25/mo</p>
              </div>
            </article>
          </div> -->
          <div class="flex justify-center mt-12">
            <button type="submit" class="btn btn-primary btn-wide">
              <Loading class="h-5 w-5" v-if="loading" />
              <font-awesome-icon :icon="['fas', 'user-plus']" class="mr-2" v-else />
              Sign Up
            </button>
          </div>

          <div v-if="error.length > 0" class="mt-4 p-4 bg-error rounded">
            {{ error }}
          </div>
        </form>
      </section>
    </div>
  </div>
</template>
