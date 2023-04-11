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
import Inbox from "../Utils/Inbox";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../Profile/Profile";
import AuthLogin from "./AuthLogin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Errorpage />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "signup",
    element: (
      <AuthLogin>
        <SignIn />
      </AuthLogin>
    ),
  },
  {
    path: "LogIn",
    element: (
      <AuthLogin>
        <Login />
      </AuthLogin>
    ),
  },
  {
    path: "chat",
    element: (
      <ProtectedRoute>
        <Chat />
      </ProtectedRoute>
    ),
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
    path: "status/:projectId",
    element: <Status />,
  },
  {
    path: "chat/:room",
    element: <Inbox />,
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
