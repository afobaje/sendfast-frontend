import React from "react";
import { createContext } from "react";
import useSocket from "../Hooks/Socket";

export const Socket = createContext("");
export default function SocketContext({ children }) {
  const socket = useSocket();
  return <Socket.Provider value={socket}>{children}</Socket.Provider>;
}
