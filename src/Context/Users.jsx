import React, { createContext, useState } from "react";

export const userContext = createContext("");
export default function Users({ children }) {
  let items = JSON.parse(localStorage.getItem("userList"));
  const [usersList, setUsersList] = useState(() => {
    if (items) {
      return items;
    } else return [];
  });

  return (
    <userContext.Provider value={{ usersList, setUsersList }}>
      {children}
    </userContext.Provider>
  );
}
