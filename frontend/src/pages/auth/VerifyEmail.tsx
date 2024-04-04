import Spinner from "@/components/ui/spinner";
import useAuth from "@/hooks/auth";
import GuestLayout from "@/layouts/GuestLayout";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "@/lib/utils";

export default function VerifyEmail() {
  const { token = "", email = "" } = useParams();
  const { isLoading, verifyEmail } = useAuth();

  const [message, setMessage] = useState("Verifying email...");

  useEffect(() => {
    const data = { token, email };
    verifyEmail(data)
      .then((response: any) => {
        console.log(response);
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage(error.data.message);
      });
  }, []);

  return (
    <GuestLayout title="Verify your email">
      <div className="mb-4 text-sm text-gray-600 h-screen grid place-items-center">
        <div>
          <h1 className="text-3xl font-bold  flex items-center gap-2">
            {isLoading ? <Spinner /> : ""}
            {capitalizeFirstLetter(message.split("-").join(" "))}
          </h1>

          {!isLoading ? (
            <Link to="/" className="text-blue-500 mt-10 block w-fit mx-auto ">
              Return to home
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </GuestLayout>
  );
}
