// src/components/App.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getUser, isLoggedIn } from "../utils/auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const loggedIn = isLoggedIn();
  const user = getUser();

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
