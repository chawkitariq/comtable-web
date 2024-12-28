import { useAuthenticationStore } from "@/stores";
import React from "react";
import { Navigate } from "react-router";

export function Authenticable({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthenticationStore();

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return children;
}
