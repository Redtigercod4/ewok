import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const authState = false;
  return authState ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
