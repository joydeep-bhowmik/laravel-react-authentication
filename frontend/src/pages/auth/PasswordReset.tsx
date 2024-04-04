import GuestLayout from "@/layouts/GuestLayout";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { passwordResetRequest } from "@/types";
import useAuth from "@/hooks/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleCheck } from "lucide-react";

export default function PasswordReset() {
  const { isLoading, resetPassword, errors: authErrors } = useAuth();
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const { token } = useParams();
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<passwordResetRequest>({
    defaultValues: {
      email: email,
      password: "",
      password_confirmation: "",
      token: token,
    },
  });

  useEffect(() => {
    for (let i in authErrors) {
      setError(i as keyof passwordResetRequest, { message: authErrors[i] });
    }
  }, [authErrors]);

  const onSubmit: SubmitHandler<passwordResetRequest> = (data) => {
    resetPassword(data).then(() => {
      setSuccess(true);
    });
  };

  return (
    <GuestLayout title="Reset Password" description="he">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-3 space-y-3">
        {success ? (
          <Alert variant="success">
            <CircleCheck className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your password is successfully changed
            </AlertDescription>
          </Alert>
        ) : (
          ""
        )}
        <h1 className="text-3xl font-bold">Reset Password </h1>

        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="example@email.com"
            className="w-full"
            {...register("email", { required: "This email field is required" })}
            disabled={true}
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

        <Button type="submit" disabled={isLoading}>
          Reset
        </Button>
      </form>
    </GuestLayout>
  );
}
