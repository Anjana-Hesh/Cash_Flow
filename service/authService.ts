import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile , GoogleAuthProvider, signInWithCredential} from "firebase/auth"
import { auth, db } from "./firebaseConfig";
import { doc, getDoc, setDoc , updateDoc} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
import { UserType } from "@/types";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// WebBrowser.maybeCompleteAuthSession();

// GoogleSignin.configure({
//     webClientId: "266647706695-4inlfrnhlea22iv7e35clevib3ovhubq.apps.googleusercontent.com", 
// });

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

// export const signInWithGoogle = async () => {
//     try {
//         // 1. check there is Google Play Services
//         await GoogleSignin.hasPlayServices();
        
//         // 2. Sign in with google
//         const response = await GoogleSignin.signIn();
//         const idToken = response.data?.idToken;

//         if (!idToken) throw new Error("ID Token missing!");

//         // 3. create Firebase Credential
//         const credential = GoogleAuthProvider.credential(idToken);

//         // 4. Enering to Firebase
//         const userCred = await signInWithCredential(auth, credential);
//         const user = userCred.user;

//         // 5. Firestore user record check in then create if not exists
//         const userRef = doc(db, "users", user.uid);
//         const userSnap = await getDoc(userRef);

//         if (!userSnap.exists()) {
//             // create a new user when not exists
//             await setDoc(userRef, {
//                 name: user.displayName,
//                 email: user.email,
//                 image: user.photoURL,
//                 role: "user",
//                 createdAt: new Date()
//             });
//         }

//         return { success: true, user };

//     } catch (error: any) {
//         console.log("Google Login Error: ", error);
//         return { success: false, msg: error.message };
//     }
// }


// ======================================//

// export const useGoogleAuth = () => {
//     const [request, response, promptAsync] = Google.useAuthRequest({
       
//         webClientId: "266647706695-4inIfrnhlea22iv7e35clevib3ovhubq.apps.googleusercontent.com",
//     });

//     const signInWithGoogle = async () => {
//         try {
//             const result = await promptAsync();
//             if (result?.type === 'success') {
//                 const { id_token } = result.params;
//                 const credential = GoogleAuthProvider.credential(id_token);
//                 return await signInWithCredential(auth, credential);
//             }
//         } catch (error) {
//             console.error("Google Auth Error:", error);
//             return null;
//         }
//     };

//     return { signInWithGoogle, request };
// };