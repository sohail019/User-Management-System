import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const ProtectedRoute = ({ element, roles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Redirect to login page if no user is logged in
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    // Redirect to home page if user role does not have access
    return <Navigate to="/" />;
  }

  // Render the protected component if user is authenticated and has the correct role
  return element;
};
