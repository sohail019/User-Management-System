import React, { useContext } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export const ProtectedRoute = ({element, roles}) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // ? if no user is logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    //? If user role does not have access, redirect to forbidden page
    return <Navigate to="/" />;
  }

  //* If user is authenticated and has the correct role, render the element
  return <Route {...rest} element={element} />;
}