import { Button, Grid } from "@chakra-ui/react";
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Auth/Login";
import SignIn from "../Auth/SignIn";
import Dashboard from "../Dashboard/Dashboard";
import Status from "../Dashboard/Status";
import Errorpage from "../Errorpage";
import Layout from "../Layout/Layout";
import Chat from "../Utils/Chat";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Errorpage />,
  },
  {
    path: "signup",
    element: <SignIn />,
  },
  {
    path: "LogIn",
    element: <Login />,
  },
  {
    path: "chat",
    element: <Chat />,
  },
  {
    path: "teams",
    element: (
      <Layout>
        <Grid h="100vh" placeItems="center">
          <div className="">we are currently working on this page</div>
        </Grid>
      </Layout>
    ),
  },
  {
    path: "video",
    element: (
      <Layout>
        <Grid h="100vh" placeItems="center">
          <div>this feature is coming soon</div>
        </Grid>
      </Layout>
    ),
  },
  {
    path: "home",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path:'status/:projectId',
    element:<Status/>
  },
  {
    path: "*",
    element: (
      <Layout>
        <div>
          oops, you shouldn't be here, lets take you back home{" "}
          <Button
            colorScheme="green"
            onClick={() => {
              alert("oops not working");
            }}
          >
            return home
          </Button>
        </div>{" "}
      </Layout>
    ),
  },
]);
