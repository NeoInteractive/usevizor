<template>
  <section class="p-4">
    <h1>Welcome, {{ user?.displayName }}</h1>
    <button
      class="my-4 t-btn inline-flex items-center bg-error"
      @click="signOutUser"
    >
      <Loading class="h-5 w-5" v-if="loading" />
      <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="mr-2" v-else />
      LogOut
    </button>

    <Dialog
      button-name="About VIZOR"
      title="About VIZOR"
      description="VIZOR is a fully dynamic scoreboard that offers tournament admins easy-to-use and customizable scoreboard overlays, with the ability to control from a Web Browser, OBS Dock, or our Stream Deck Plugins."
      :icon="['fas', 'info-circle']"
    />
  </section>
</template>

<script>
import { useAuthState, useSignOut } from "@/firebase";
import { useRouter } from "vue-router";
import { defineComponent, ref } from "vue";
import Dialog from "@/components/Dialog.vue";
import Loading from "@/components/Loading.vue";

export default defineComponent({
  name: "Home",
  components: {
    Dialog,
    Loading,
  },
  setup() {
    const { user } = useAuthState();
    const router = useRouter();

    const loading = ref(false);

    const signOutUser = async () => {
      loading.value = true;
      await useSignOut();
      await router.replace({ name: "Login" });
      loading.value = false;
    };

    return { user, signOutUser, loading };
  },
});
</script>
