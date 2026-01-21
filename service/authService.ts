import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth"
import { auth, db } from "./firebaseConfig";
import { doc, getDoc, setDoc , updateDoc} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "@/types";

export const login = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
}

export const registerUser = async (
    name:string,
    email: string,
    password: string
) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCred.user, {
        displayName: name,
        photoURL:""
    });

    setDoc(doc(db, "users",userCred.user.uid),{
        name,
        role:"",
        email,
        createdAt: new Date()
    })
}

export const logout = async () => {
    await signOut(auth);
    AsyncStorage.clear();
    // AsyncStorage.setItem("key", {});
    // AsyncStorage.getItem("key");
    return;
}

export const updateUser = async (uid: string, data: { name: string; image?: any }) => {
    try {
        const docRef = doc(db, "users", uid);
        
        // Firestore eke user data update kirima
        await updateDoc(docRef, {
            name: data.name,
            image: data.image || null
        });

        return { success: true };
    } catch (error: any) {
        console.log("Error updating user: ", error);
        return { success: false, msg: error.message };
    }
}