import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

export const PrivateRoutes = () => {
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

