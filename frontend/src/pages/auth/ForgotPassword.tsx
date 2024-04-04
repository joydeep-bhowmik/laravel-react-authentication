import GuestLayout from "@/layouts/GuestLayout";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { forgotPasswordRequest } from "@/types";
import useAuth from "@/hooks/auth";
import Spinner from "@/components/ui/spinner";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleCheck } from "lucide-react";

export default function ForgotPassword() {
  const { isLoading, forgotPassword, errors: authErrors } = useAuth();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<forgotPasswordRequest>();

  useEffect(() => {
    for (let i in authErrors) {
      setError(i as keyof forgotPasswordRequest, { message: authErrors[i] });
    }
  }, [authErrors]);

  const onSubmit: SubmitHandler<forgotPasswordRequest> = (data) => {
    forgotPassword(data).then(() => setSuccess(true));
  };

  return (
    <GuestLayout title="Reset Password" description="he">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-3 space-y-3">
        <Link to="/login">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
        </Link>

        {success ? (
          <Alert variant="success">
            <CircleCheck className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              We have sent you an email containing a password reset link.
            </AlertDescription>
          </Alert>
        ) : (
          ""
        )}

        <h1 className="text-3xl font-bold">Forgot Password </h1>

        <div className="my-4 text-sm text-gray-600 dark:text-gray-400">
          Forgot your password? No problem. Just let us know your email address
          and we will email you a password reset link that will allow you to
          choose a new one.
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

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <Spinner className="!w-6 !h-6" />
          ) : (
            "Email Password Reset Link"
          )}
        </Button>
      </form>
    </GuestLayout>
  );
}
