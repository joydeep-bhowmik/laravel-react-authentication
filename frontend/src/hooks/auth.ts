import axios from "@/lib/axios";
import { api, removeCookie } from "@/lib/utils";
import { useState } from "react";
import { useStore } from "@/store";
import {
  forgotPasswordRequest,
  loginRequest,
  passwordResetRequest,
  registerRequest,
  verifyEmailResetRequest,
} from "@/types";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
interface Errors {
  [key: string]: any;
}

const useAuth = ({
  isLoading: defaultIsLoading = false,
  status: defaultStatus = null,
} = {}) => {
  const { user, setUser, setToken } = useStore((state) => state);
  const [isLoading, setIsLoading] = useState(defaultIsLoading);
  const [action, setAction] = useState<null | string>(null);
  const [errors, setErrors] = useState<Errors>([]);
  const [status, setStatus] = useState(defaultStatus);
  const navigate = useNavigate();

  const login = (data: loginRequest, redirect: string = "/") =>
    makeRequest(
      axios.post(api("login"), data),
      (response) => {
        const token = response.data.token;
        if (token) {
          setToken(token);
          navigate(redirect);
        }
      },
      "login"
    );

  const logout = () =>
    makeRequest(
      axios.post(api("logout")),
      () => {
        setToken(null);
        setUser(null);
        removeCookie("token");
        navigate("/login");
      },
      "logout"
    );

  const register = (data: registerRequest, redirect: string = "/") =>
    makeRequest(
      axios.post(api("register"), data),
      (response) => {
        const token = response.data.token;
        if (token) {
          setToken(token);
          navigate(redirect);
        }
      },
      "register"
    );

  const forgotPassword = (data: forgotPasswordRequest) =>
    makeRequest(
      axios.post(api("forgot-password"), data),
      undefined,
      "forgotPassword"
    );

  const resetPassword = (data: passwordResetRequest) =>
    makeRequest(
      axios.post(api("reset-password"), data),
      undefined,
      "resetPassword"
    );

  const sendEmailverificationLink = () =>
    makeRequest(
      axios.post(api("email/verification-notification")),
      undefined,
      "sendEmailverificationLink"
    );

  const verifyEmail = (data: verifyEmailResetRequest) => {
    const { token, email } = data;
    return makeRequest(
      axios.get(api(`verify-email/${email}/${token}`)),
      undefined,
      "verifyEmail"
    );
  };

  const getUser = () =>
    new Promise(async (resolve, reject) => {
      try {
        if (user) {
          resolve(user);
          return;
        }
        setAction("getUser");
        setIsLoading(true);

        const response = await axios.get(api("user"));
        const userData = response.data;
        if (response.request.status !== 401) setUser(userData);
        setStatus(response?.request.status);
        resolve(userData);
      } catch (error) {
        reject(error);
      } finally {
        setIsLoading(false);
        setAction(null);
      }
    });

  const makeRequest = (
    requestPromise: any,
    callback: (response: AxiosResponse) => void = () => {},
    target: null | string
  ) =>
    new Promise((resolve, reject) => {
      setAction(target);
      setIsLoading(true);
      requestPromise
        .then((response: any) => {
          setStatus(response.request.status);
          resolve(response);
          callback(response);
        })
        .catch((error: any) => {
          const response = error.response;
          setErrors(response.data.errors);
          setStatus(response.request.status);
          reject(response);
          callback(response);
        })
        .finally(() => {
          setIsLoading(false);
          setAction(null);
        });
    });

  return {
    isLoading,
    status,
    errors,
    login,
    logout,
    register,
    forgotPassword,
    getUser,
    resetPassword,
    sendEmailverificationLink,
    verifyEmail,
    action,
  };
};

export default useAuth;
