import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AuthContext from "./Context/AuthContext";
import { router } from "./Routes/Route";
import StoreContext from "./Context/StoreContext";
import SocketContext from "./Context/SocketContext";
import CommentContext from "./Context/CommentContext";
import RoomContext from "./Context/roomContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContext>
      <StoreContext>
        <SocketContext>
          <CommentContext>
            <RoomContext>
              <ChakraProvider>
                <RouterProvider router={router} />
              </ChakraProvider>
            </RoomContext>
          </CommentContext>
        </SocketContext>
      </StoreContext>
    </AuthContext>
  </React.StrictMode>
);
