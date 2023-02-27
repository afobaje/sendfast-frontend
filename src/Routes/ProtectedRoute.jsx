import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Authorized } from "../Context/AuthContext";

export default function ProtectedRoute({ children }) {
  let { authenticated } = useContext(Authorized);
  return <>{authenticated ? children : <Navigate to="/LogIn" />}</>;
}
