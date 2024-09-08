import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const ProtectedRoute = ({ element, roles }) => {
  const { user, loading } = useContext(AuthContext);

   if (loading) {
     return <p>Loading...</p>; // Show loading while waiting for auth check
   }

   if (!loading && !user) {
     // If loading is complete and there's no user, redirect to login
     return <Navigate to="/login" />;
   }

  if (roles && !roles.includes(user.role)) {
    // Redirect to home page if user role does not have access
    return <Navigate to="/" />;
  }

  // Render the protected component if user is authenticated and has the correct role
  return element;
};
