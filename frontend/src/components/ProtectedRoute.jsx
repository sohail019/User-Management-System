import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const ProtectedRoute = ({ element, roles }) => {
  const { user, loading } = useContext(AuthContext);
  console.log("User Info in ProtectedRoute:", user); // Debugging log

  if (loading) {
    return <p>Loading...</p>; // Show loading while waiting for auth check
  }

  if (!loading && !user) {
    // If loading is complete and there's no user, redirect to login
    return <Navigate to="/login" />;
  }

   if (roles && !roles.includes(user.role)) {
     return <Navigate to="/" />;
   }
  console.log("User has required role, rendering element"); // Debugging log

  // Render the protected component if user is authenticated and has the correct role
  return element;
};
