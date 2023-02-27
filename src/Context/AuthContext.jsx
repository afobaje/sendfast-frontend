import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { firebaseApp } from "../Authconfig/Auth";

export const Authorized = createContext("");
export default function AuthContext({ children }) {
  let [authenticated, setAuthenticated] = useState();

  useEffect(() => {
    onAuthStateChanged(firebaseApp, (user) => {
      if (user) {
        setAuthenticated(user);
      } else {
        setAuthenticated(null);
      }
    });
  }, []);
  return (
    <Authorized.Provider value={{ authenticated }}>
      {children}
    </Authorized.Provider>
  );
}
