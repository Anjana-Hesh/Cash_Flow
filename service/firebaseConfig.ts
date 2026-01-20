import { initializeApp } from "firebase/app";
// @ts-ignore
import { initializeAuth , getReactNativePersistence} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCj7bR1eeApGABOZxRNX7J3Av2ha5d8B8o",
  authDomain: "cash-flow-3a3e1.firebaseapp.com",
  projectId: "cash-flow-3a3e1",
  storageBucket: "cash-flow-3a3e1.firebasestorage.app",
  messagingSenderId: "266647706695",
  appId: "1:266647706695:web:1f8765144b29b85987a562"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});


export const db = getFirestore(app);