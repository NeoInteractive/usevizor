import { defineStore } from "pinia";

export const useStore = defineStore("user", {
  state: () => {
    return {
      auth_data: undefined,
      profile_data: undefined,
    };
  },
  actions: {
    setAuthData(auth_data) {
      this.auth_data = auth_data;
    },
    setProfileData(profile_data) {
      this.profile_data = profile_data;
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random());
    },
  },
  persist: true,
});
