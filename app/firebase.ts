import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBDJJ-Rnhd0D4qQB6DeY_A0ohAeqxthRFE",
  authDomain: "tradenestx-f00f6.firebaseapp.com",
  projectId: "tradenestx-f00f6",
  storageBucket: "tradenestx-f00f6.firebasestorage.app",
  messagingSenderId: "699923707343",
  appId: "1:699923707343:web:7c3546a74785fafba30eba"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);