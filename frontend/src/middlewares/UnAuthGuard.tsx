import { useStore } from "@/store";
import { Navigate, Outlet } from "react-router-dom";

function UnAuthGuard() {
  const { user } = useStore((state) => state);

  return user ? <Navigate to="/" /> : <Outlet />;
}

export default UnAuthGuard;
