import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function GuardComponent() {
  const data = useLocation();
  if (data.state === null) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
