"use client";

import { useState } from "react";
import left_arrow from "../../../../public/assets/Svg/left_arrow.svg";
import axios from "axios";
import toast from "react-hot-toast";

import upload_success from "../../../../public/assets/Svg/upload_success.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AppLogo from "@/components/molecules/AppLogo";
import { Button } from "@/components/atoms/Button";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const apiSecret = "s0meR3ndomP@$$Word";

  const handleForgotPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/forgotpassword`,
        {
          email,
        },
        {
          headers: {
            "x-api-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
            "x-api-secret": apiSecret,
          },
        }
      )
      .then((res) => {
        toast.success("Password reset token sent");
        setEmailSent(true);
        setLoading(false);
        // router.push("/resetpassword");
      })
      .catch((err) => {
        if (err.response.status === 300) {
          localStorage.setItem(
            "password_reset_token",
            JSON.stringify(err.response.data.token)
          );
          toast.success("Password reset token sent");
          setEmailSent(true);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
          setMessage(err.response.data.message);
          toast.error(err.response.data.message);
        }
      });
  };
  return (
    <div className="bg-gray-100 na_bg2 auth h-screen flex justify-center items-center p-4 lg:p-[115px] ">
      <div className="bg-white shadow-2xl rounded-[20px] p-6 max-w-[800px] ">
        <div className="grid grid-cols-3 items-center">
          <div>
            <button
              onClick={() => {
                router.push("/login");
              }}
            >
              <Image src={left_arrow} alt="" />
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <AppLogo responsive={false} image={false} />
        </div>

        {!emailSent ? (
          <div className="lg:px-[100px] px-10">
            <h1 className="text-center font-medium lg:text-2xl text-base mt-2">
              Forgot Password
            </h1>
            <p className="text-center font-medium lg:text-xl text-sm mt-6">
              Provide your {`account's`} email for which you want to reset your
              password
            </p>

            <form className="mt-10 lg:pb-20" onSubmit={handleForgotPassword}>
              <label htmlFor="email" className="text-[#666666]">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />

              {error && <h1 className="text-red-500"> {message} </h1>}
              <Button
                size="xl"
                className="w-full rounded-full"
                loading={loading}
              >
                Request reset password link
              </Button>
            </form>
          </div>
        ) : (
          <div className="my-12">
            <Image src={upload_success} alt="" className="mx-auto" />

            <p className="text-center font-medium lg:text-2xl my-4">
              You will receive an email with a link to reset your password.
              Please check your inbox.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
