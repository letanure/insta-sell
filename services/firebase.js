import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjw0ioWmfPj6MemA_V0VODOZ11DJ9WYtM",
  authDomain: "instasell-de537.firebaseapp.com",
  projectId: "instasell-de537",
  storageBucket: "instasell-de537.appspot.com",
  messagingSenderId: "276746096043",
  appId: "1:276746096043:web:b5156aa8674870cf4816ee",
  measurementId: "G-J0H3BTTE5K",
};
const app = initializeApp(firebaseConfig);

export default app;
export const db = getFirestore(app);
