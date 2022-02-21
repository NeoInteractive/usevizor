import { defineStore } from "pinia";

export const useStore = defineStore("user", {
  state: () => {
    return {
      auth_data: undefined,
    };
  },
  actions: {
    setAuthData(auth_data) {
      this.auth_data = auth_data;
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random());
    },
  },
  persist: true,
});
