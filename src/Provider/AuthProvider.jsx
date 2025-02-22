import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../firebas.config";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  const googleLogin = () => {
    setIsLoading(true);
    return signInWithPopup(auth, provider);
  };
  const logoutUser = () => {
    setIsLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // console.log(currentUser);
      if (currentUser) {
        const user = {
          email: currentUser?.email,
        };
        const { data } = await axios.post(
          "http://localhost:4545/jwt-sing",
          user
        );
        localStorage.setItem("token", data.token);
        setUser(currentUser);
        setIsLoading(false);
      } else {
        setUser(null);
        localStorage.removeItem("token");
        setIsLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authInfo = {
    googleLogin,
    setUser,
    user,
    logoutUser,
    isLoading,
    setIsLoading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
