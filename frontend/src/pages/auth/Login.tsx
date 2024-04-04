import GuestLayout from "@/layouts/GuestLayout";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "@/hooks/auth";
import { useEffect } from "react";
import { loginRequest } from "@/types";
import Spinner from "@/components/ui/spinner";

export default function Login() {
  const { isLoading, errors: authErrors, login, status } = useAuth();

  console.log(status);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<loginRequest>();

  useEffect(() => {
    for (let i in authErrors) {
      setError(i as keyof loginRequest, { message: authErrors[i] });
    }
  }, [authErrors]);

  const onSubmit: SubmitHandler<loginRequest> = (data) => {
    login(data);
  };

  return (
    <GuestLayout title="Login" description="he">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-3 space-y-3">
        <h1 className="text-3xl font-bold">Login </h1>

        <p className="text-sm">
          Welcome :) . Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Create
          </Link>
        </p>

        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="example@email.com"
            className="w-full"
            {...register("email", { required: "This email field is required" })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="********"
            className="w-full"
            {...register("password", {
              required: "This password field is required",
            })}
          />

          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Spinner className="!w-6 !h-6" /> : "Submit"}
        </Button>

        <div className="flex items-center">
          <Link to="/forgot-password" className="text-blue-500 text-sm ml-auto">
            Forgot password?
          </Link>
        </div>
      </form>
    </GuestLayout>
  );
}
