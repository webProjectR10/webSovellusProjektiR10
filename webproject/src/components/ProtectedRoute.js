import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UseUser";

export default function ProtectedRoute({ children }) {
  const { user } = useUser();

  if (!user || !user.token) {
    return <Navigate to="/login" />;
  }

  return children;
}
