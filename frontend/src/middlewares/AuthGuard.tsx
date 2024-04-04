import { useStore } from "@/store";
import { Navigate, Outlet } from "react-router-dom";

function AuthGuard() {
  const { user } = useStore((state) => state);

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthGuard;
