/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/atoms/Button";
import Loader from "@/components/atoms/Loader";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AppLogo from "@/components/molecules/AppLogo";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/services/login";
import { toast } from "sonner";
import { LoginData } from "@/types/auth";
import Cookies from "js-cookie";

function Login() {
  const router = useRouter();
  const [passwordType, setPasswordType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [social_loading, setSocial_Loading] = useState({
    google: false,
    apple: false,
  });
  const handlePasswordType = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };
  const [loading, setLoading] = useState(true);

  // Login MUTATION
  const {
    isSuccess,
    isPending,
    mutateAsync: loginMutation,
  } = useMutation({
    mutationFn: (data: LoginData) => loginUser(data),
    onSuccess: (data: any) => {
      console.log("success", { data });
      toast.success("Login successful.");
      Cookies.set("AUTH_TOKEN", data.token); // Set user token in cookies
      Cookies.set("USER", JSON.stringify(data.user), {
        path: "/",
        secure: false,
      });
      console.log("user", data.user);
      localStorage.setItem("AUTH_TOKEN", data.token); // Set user token in cookies
      // Set user data in cookies
      const userDataWithMemberships = {
        ...data.user,
        businesses_membership: data.businesses_membership,
        projects_membership: data.projects_membership,
        events_membership: data.events_membership,
      };

      setLoading(false);
      // Set user data in cookies
      localStorage.setItem("USER", JSON.stringify(userDataWithMemberships));
      router.push("/feed"); // redirect to feed after login
    },
    onError: (error: any) => {
      console.log("error:", { error });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const loginData = {
      email,
      meta: { password },
      signin_mode: "email",
    };

    loginMutation(loginData);
    setLoading(true);
    console.log("login Data: ", loginData);
  };

  return (
    <div className="bg-gray-100 na_bg2 auth min-h-max flex justify-center items-center p-4 lg:p-[70px] ">
      <div className="bg-white shadow-2xl w-full md:w-fit rounded-[20px] p-6 max-w-[1200px] ">
        <div className="grid grid-cols-3 items-center">
          <div>
            <button
              onClick={() => {
                router.push("/");
              }}
            >
              <Image
                src="/assets/Svg/left_arrow.svg"
                alt=""
                className="w-8 h-8 "
                height={100}
                width={100}
              />
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <AppLogo responsive={false} image={false} />
        </div>

        <div className="lg:px-[100px]">
          <h1 className="text-center font-medium lg:text-2xl text-base mt-1">
            Welcome Back
          </h1>
          <div className="text-center text-sm mt-4">
            Don't have an account?
            <Link className="text-na_blue ml-1" href={"/signup"}>
              Sign up
            </Link>
          </div>

          <div className="flex flex-col items-center mt-2">
            ?
            <button
              // onClick={() => googleLogin()}
              className="bg-white border border-black flex justify-center items-center space-x-4 rounded-full lg:p-4 px-2 py-3 mt-4 w-full lg:text-base text-sm  text-[#333333]"
            >
              {social_loading.google ? (
                <div>
                  <Loader />
                </div>
              ) : (
                <>
                  <img src="/assets/Svg/Social/google.svg" alt="google_logo" />
                  {/* <Image
                  src="/assets/Svg/Social/google.svg"
                  alt="google_logo"
                /> */}
                  <h1>Sign in with Google</h1>
                </>
              )}
            </button>
          </div>

          <div className="grid my-2">
            <div className="flex justify-between transform translate-y-[18px]">
              <div className="w-5/12 mx-auto z-[1]  border-t border-gray-500"></div>
              <div className="w-5/12 mx-auto z-[1]  border-t border-gray-500"></div>
            </div>
            <div className="z-[2] w-full flex justify-center text-xl text-[#666666]">
              <p className=" px-4 py-1">OR</p>
            </div>
          </div>

          <form className="mt-2 mb-4" onSubmit={handleLogin}>
            <label htmlFor="email" className="text-[#666666]">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              id="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="input"
            />
            <div className="flex justify-between items-center">
              <label htmlFor="Password" className="text-[#666666]">
                Password
              </label>
              <div onClick={handlePasswordType} className="mr-4 cursor-pointer">
                <i
                  className={`fa ${
                    passwordType !== "password" ? "fa-eye" : "fa-eye-slash"
                  } text-[#666666]`}
                ></i>
              </div>
            </div>
            <input
              type={passwordType}
              placeholder="Password"
              id="Password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="input"
            />

            <Button
              size="xl"
              className="flex justify-center bg-na_blue rounded-full mt-4 w-full text-[#ffffff]"
              loading={loading}
              disabled={loading}
            >
              Login here
            </Button>
          </form>
          <div className={"text-center pb-16"}>
            <Link
              href={"/forgotpassword"}
              className="mt-4 text-center  text-na_blue text-sm md:text-base"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
