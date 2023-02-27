import { useState } from "react";
import io from "socket.io-client";
import { useEffect } from "react";
const LINK = `http://localhost:3000`;
let socket = io(LINK);

export default function useSocket() {
  let [isConnected, setisConnected] = useState(socket.isConnected);
  useEffect(() => {
    socket.on("connect", () => {
      setisConnected(true);
    });
    socket.on("disconnect", () => {
      setisConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket.isConnected,isConnected]);

  if (isConnected === false) {
    return isConnected;
  } else return socket;
}
