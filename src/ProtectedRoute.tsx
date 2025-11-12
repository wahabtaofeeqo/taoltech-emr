import { Navigate, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import React from "react";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = localStorage.getItem("authToken") !== null;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

<Route
  path="/"
  element={
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  }
></Route>;

export default ProtectedRoute;
