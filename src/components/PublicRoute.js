import React from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ Children }) {
  if (localStorage.getItem("token")) {
    return <Navigate to="/dashboard" />;
  } else {
    return Children;
  }
}
