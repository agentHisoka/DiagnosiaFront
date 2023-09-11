import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "./auth"; // Import the isAuthenticated function

const ProtectedRoute = ({ roles }) => {
  const auth = isAuthenticated(); // determine if authorized, from context or however you're doing it
  const location = useLocation();

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  if (!auth) {
    return <Navigate to="/signIN" state={{ from: location }} replace />;
  }
  return roles && roles.includes(auth.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};
export default ProtectedRoute;
