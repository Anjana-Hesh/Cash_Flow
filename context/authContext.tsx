import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/service/firebaseConfig"; 
import { useLoader } from "@/hooks/useLoader";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { hideLoader, isLoading, showLoader } = useLoader();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // showLoader();

    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            
            setUser({
              ...currentUser,
              displayName: userData.name || currentUser.displayName,
              photoURL: userData.image || currentUser.photoURL, 
            } as any);
          } else {
            setUser(currentUser);
          }
        } catch (error) {
          console.log("Error fetching user doc: ", error);
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      // hideLoader();
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading , setUser }}>
      {children}
    </AuthContext.Provider>
  );
};