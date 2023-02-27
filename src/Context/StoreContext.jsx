import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { app } from "../Authconfig/Auth";

export const Store = createContext("");
export default function StoreContext({ children }) {
  let [store, setStore] = useState([]);
  const db = getFirestore(app);
  const getStore = async () => {
    await getDocs(collection(db, "projects")).then((query) => {
      const data = query.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setStore(data);
    });
  };
  useEffect(() => {
    getStore();
  }, []);
  return <Store.Provider value={store}>{children}</Store.Provider>;
}
