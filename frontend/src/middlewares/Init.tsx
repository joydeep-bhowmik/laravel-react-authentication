import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "@/hooks/auth";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";

export default function Init() {
  const { isLoading, getUser } = useAuth({ isLoading: true });

  const callGetUser = async () => {
    await getUser();
  };

  useEffect(() => {
    callGetUser();
  }, []);

  return isLoading ? <LoadingPlaceholder /> : <Outlet />;
}
