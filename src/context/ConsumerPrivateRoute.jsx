import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

const ConsumerPrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return ; 
  }
  if (!user || user.role !== 'consumer' ) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default ConsumerPrivateRoute
