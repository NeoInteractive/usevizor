import { initializeApp } from "firebase/app";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { useStore } from "@/stores/user.store";
// const userStore = useStore();
export const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vizor-live.firebaseapp.com",
  projectId: "vizor-live",
  storageBucket: "vizor-live.appspot.com",
  messagingSenderId: "110124175099",
  appId: "1:110124175099:web:d5757cb6afe6a3c93f2a5e",
});
export const useAuthState = () => {
  const user = ref(null);
  const error = ref(null);
  const auth = getAuth();
  let unsubscribe;

  onMounted(() => {
    unsubscribe = onAuthStateChanged(
      auth,
      (u) => (user.value = u),
      (e) => (error.value = e)
    );
  });

  onUnmounted(() => unsubscribe());

  const isAuthenticated = computed(() => user.value != null);
  return { user, error, isAuthenticated };
};

export const useSignOut = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
  } catch (e) {
    alert(e.message);
  }
};

export const getUserState = () =>
  new Promise((resolve, reject) =>
    onAuthStateChanged(getAuth(), resolve, reject)
  );

export const db = getFirestore(firebaseApp);
