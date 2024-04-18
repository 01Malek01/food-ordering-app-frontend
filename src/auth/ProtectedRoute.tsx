import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth0();
  //outlet is used to render the children of the route
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
