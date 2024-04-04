import GuestLayout from "@/layouts/GuestLayout";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "@/hooks/auth";
import { useEffect } from "react";
import { registerRequest } from "@/types";
import Spinner from "@/components/ui/spinner";

export default function Register() {
  const {
    isLoading,
    errors: authErrors,
    register: requestRegister,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<registerRequest>();

  useEffect(() => {
    for (let i in authErrors) {
      setError(i as keyof registerRequest, { message: authErrors[i] });
    }
  }, [authErrors]);

  const onSubmit: SubmitHandler<registerRequest> = (data) => {
    requestRegister(data);
  };

  return (
    <GuestLayout title="Register" description="he">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full  p-3 space-y-3">
        <h1 className="text-3xl font-bold">Create an account </h1>

        <p className="text-sm">
          Already register ?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>

        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Joydeep bhowmik"
            className="w-full"
            {...register("name", { required: "This name field is required" })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

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
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
          />

          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password_confirmation">Confirm password</Label>
          <Input
            type="password"
            id="password_confirmation"
            placeholder="********"
            className="w-full"
            {...register("password_confirmation", {
              required: "This password confirmation field is required",
              validate: (value, formValues) =>
                value === formValues.password || "The passwords do not match",
            })}
          />

          {errors.password_confirmation && (
            <span className="text-red-500 text-sm">
              {errors.password_confirmation.message}
            </span>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Spinner className="!w-6 !h-6" /> : "Submit"}
        </Button>
      </form>
    </GuestLayout>
  );
}
