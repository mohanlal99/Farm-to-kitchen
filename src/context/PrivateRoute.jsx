import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return ; 
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default PrivateRoute;

