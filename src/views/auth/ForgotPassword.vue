<template>
  <div class="bg-gray-950 pt-24">
    <div class="t-main-set flex-1 grid place-items-center">
      <section
        class="p-12 bg-gray-950/25 w-1/2 rounded backdrop-blur-sm border border-gray-925"
      >
        <form @submit.prevent="handleSubmit">
          <h1 class="mb-6">Forgot Password</h1>
          <hr />
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2" for="email"> Email </label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              class="w-full h-12 rounded bg-gray-925 border border-gray-500 px-4 py-2"
            />
          </div>
          <div class="flex justify-between items-center">
            <button type="submit" class="btn inline-flex items-center btn-primary">
              <Loading class="h-5 w-5" v-show="loading" />
              Submit
            </button>
            <h5>
              Remembered Password?
              <router-link :to="{ name: 'Login' }" class="text-primary ml-4">
                Login
              </router-link>
            </h5>
          </div>

          <div
            v-if="message.length > 0"
            :class="`mt-4 p-4 rounded ${
              message.substr(0, 5) !== 'Email' ? 'bg-error' : 'bg-primary'
            }`"
          >
            {{ message }}
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ref } from "vue";
import Loading from "@/components/Loading.vue";
import Dialog from "@/components/Dialog.vue";
export default {
  components: {
    Loading,
    Dialog,
  },
  setup() {
    const auth = getAuth();

    const loading = ref(false);
    const message = ref("");

    const handleSubmit = async (e) => {
      loading.value = true;
      const { email } = e.target.elements;
      if (email.value.length > 0) {
        try {
          await sendPasswordResetEmail(auth, email.value);
          message.value = "Email sent to your registered email id";
        } catch (e) {
          message.value = e.message;
        }
      } else {
        message.value = "Enter Email Id";
      }
      loading.value = false;
    };
    return { handleSubmit, message, loading };
  },
};
</script>
