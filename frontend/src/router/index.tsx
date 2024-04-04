import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "@/pages/admin/Dashboard";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import PasswordReset from "@/pages/auth/PasswordReset";
import UnAuthGuard from "@/middlewares/UnAuthGuard";
import Init from "@/middlewares/Init";
import Home from "@/pages/Home";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import AuthGuard from "@/middlewares/AuthGuard";
import VerifyEmail from "@/pages/auth/VerifyEmail";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Init />}>
      <Route path="/" element={<Home />} />
      <Route path="/blog">
        <Route index element={<Dashboard />} />
      </Route>
      <Route element={<UnAuthGuard />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route path="/password-reset/:token" element={<PasswordReset />} />
      <Route element={<AuthGuard />}>
        <Route path="/verify-email/:email/:token" element={<VerifyEmail />} />
      </Route>
    </Route>
  )
);
