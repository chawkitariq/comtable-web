import { useAuthenticationStore } from "@/stores";
import { Navigate, Outlet } from "react-router";

export function Authenticable() {
  const { isAuthenticated } = useAuthenticationStore();

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
