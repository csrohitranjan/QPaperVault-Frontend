// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUser, isLoggedIn } from "../utils/auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const loggedIn = isLoggedIn();
  const user = getUser();

  // ------------------------------------------------------------------
  // 1. If NOT LOGGED IN → redirect to login + store "from" for redirect back
  // ------------------------------------------------------------------
  if (!loggedIn) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }} // <- this is essential for post-login return
        replace
      />
    );
  }

  // ------------------------------------------------------------------
  // 2. If logged in but role NOT allowed → block access
  // ------------------------------------------------------------------
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  // ------------------------------------------------------------------
  // 3. User has access → render protected content
  // ------------------------------------------------------------------
  return children;
};

export default ProtectedRoute;
