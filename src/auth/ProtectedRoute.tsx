import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth0();
  //outlet is used to render the children of the route
  // return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;

  if (isLoading) {
    return <div className="text-center text-4xl font-bold mt-10 ">Loading...</div>;
  }
  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
}
