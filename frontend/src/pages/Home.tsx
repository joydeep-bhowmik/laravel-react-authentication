import useAuth from "@/hooks/auth";
import { Link } from "react-router-dom";

export default function Home() {
  const { isLoading, logout, action, sendEmailverificationLink } = useAuth();
  console.log(action);
  return (
    <div className="flex flex-col gap-5 p-5 max-w-md mx-auto">
      <Link to="/register" className="block text-center p-5 bg-slate-50">
        Register
      </Link>

      <Link to="/login" className="block text-center p-5 bg-slate-50">
        Login
      </Link>

      <button onClick={logout} className="block text-center p-5 bg-slate-50">
        {isLoading && action == "logout" ? "loggin out..." : "Logout"}
      </button>

      <button
        onClick={sendEmailverificationLink}
        className="block text-center p-5 bg-slate-50"
      >
        {isLoading && action == "sendEmailverificationLink"
          ? "Sent verification link..."
          : "Sent verification link"}
      </button>
    </div>
  );
}
