import { useLoader } from "@/hooks/useLoader";
import { auth } from "@/service/firebaseConfig";
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

  useEffect(() => {
    showLoader();

    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      hideLoader();
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading: isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
