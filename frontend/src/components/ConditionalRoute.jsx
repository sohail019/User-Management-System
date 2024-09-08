import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ConditionalRoute = ({ element, redirectTo, condition }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>; // Show loading while waiting for auth check
  }

  if (condition(user)) {
    return <Navigate to={redirectTo} />;
  }

  return element;
};

export default ConditionalRoute;
