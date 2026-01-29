"use client";

import { useState } from "react";

import left_arrow from "../../../../public/assets/Svg/left_arrow.svg";
// import Apple from "../../../../../public/assets/Svg/Social/apple.svg";
// import fx from "../../../../../public/assets/Svg/Social/google.svg";
import Link from "next/link";
import AppLogo from "@/components/molecules/AppLogo";
import Loader from "@/components/atoms/Loader";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AppleLogin from "react-apple-login";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/atoms/Button";
import { loginUser, verifyTwoFactor } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { LoginData } from "@/types/auth";
import Cookies from "js-cookie";
import { toast } from "sonner";
import VerifyOtp from "@/components/organisms/Settings/verifyOtp";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const [passwordType, setPasswordType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [social_loading, setSocial_Loading] = useState({
    google: false,
    apple: false,
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlePasswordType = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  // Login MUTATION
  const {
    isSuccess,
    isPending,
    mutateAsync: loginMutation,
  } = useMutation({
    mutationFn: (data: LoginData) => loginUser(data),
    onSuccess: (data: any) => {
      console.log("success", { data });
      // Set user token in cookies
      Cookies.set("AUTH_TOKEN", data.token);

      if (data?.user) {
        localStorage.setItem("AUTH_TOKEN", data.token); // Set user token in cookies
        // here no OTP is required
        const essentialUserData = {
          id: data.user.id,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          email: data.user.email,
          user_token: data.user.user_token,
          is_admin: data.user.is_admin,
        };
        Cookies.set("USER", JSON.stringify(essentialUserData));

        const userDataWithMemberships = {
          ...data.user,
          businesses_membership: data.businesses_membership,
          projects_membership: data.projects_membership,
          events_membership: data.events_membership,
        };

        // Set user data in cookies
        localStorage.setItem("USER", JSON.stringify(userDataWithMemberships));
        toast.success("Login successful.");
        router.push("/feed"); // redirect to feed after login
      } else {
        setShowModal(true);
        return;
      }
    },
    onError: (error: any) => {
      console.log("error:", { error });
      toast.error(error?.response?.data?.message ?? "Login failed.");
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
  };

  const socialLoginHandler = async (credential: string, provider: string) => {
    setSocial_Loading({ ...social_loading, [provider]: true });
    const loginData = {
      meta: { token: credential },
      signin_mode: provider,
    };

    loginMutation(loginData);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      const token = response.access_token;
      const url = "/googlelogin";
      socialLoginHandler(token, "google");
    },
    onError: (response) => {},
  });
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = async (otp: string) => {
    setLoading(true);
    try {
      const res = await verifyTwoFactor({
        otp,
        token: Cookies.get("AUTH_TOKEN") || "",
      });
      const data = res.data;
      const essentialUserData = {
        id: data.user.id,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        email: data.user.email,
        user_token: data.user.user_token,
        is_admin: data.user.is_admin,
      };
      Cookies.set("USER", JSON.stringify(essentialUserData));
      localStorage.setItem("AUTH_TOKEN", data.token);
      const userDataWithMemberships = {
        ...data.user,
        businesses_membership: data.businesses_membership,
        projects_membership: data.projects_membership,
        events_membership: data.events_membership,
      };

      // Set user data in cookies
      localStorage.setItem("USER", JSON.stringify(userDataWithMemberships));
      toast.success("Login successful.");
      handleCloseModal;
      setLoading(false);
      router.push("/feed");
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message ||
          "An error occurred, try again"
      );
    }
  };

  const appleSignIn = (response: any) => {
    console.log("apple response", response);
    const id_token = response?.authorization?.id_token;
    socialLoginHandler(id_token, "apple");
  };

  return (
    <>
      <VerifyOtp
        open={showModal}
        handleModal={(open: boolean) => setShowModal(open)}
        handleConfirm={handleConfirm}
        loading={loading}
      />
      <div className="bg-gray-100 na_bg2 auth min-h-max flex flex-col justify-center items-center p-4 lg:px-[70px] ">
        <div className="w-full max-w-[30rem] mt-[8%] mx-auto overflow-hidden bg-white shadow-2xl rounded-[20px] ">
          <div className="px-4 md:px-8 py-2">
            <div className="float-left pb-4">
              <button
                onClick={() => {
                  router.push("/");
                }}
              >
                <Image src={left_arrow} alt="" className="w-8 h-8 " />
              </button>
            </div>
            <div className="flex justify-center mt-14 md:mt-8 my-4 mx-auto">
              <AppLogo responsive={false} image={false} />
            </div>
            <h1 className="text-center font-medium lg:text-2xl text-base mt-1">
              Welcome Back
            </h1>
            <div className="text-center text-sm mt-4">
              {`Don't`} have an account?
              <Link className="text-na_blue ml-1" href={"/signup"}>
                Sign up
              </Link>
            </div>

            <div className="flex flex-col items-center mt-2">
              {/* <AppleLogin
                clientId={`com.letivi.letivi`}
                redirectURI={`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/login`}
                scope="email name"
                state="state"
                usePopup={true}
                callback={appleSignIn}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    className="bg-white border border-black flex justify-center items-center space-x-4 rounded-full lg:p-4 p-2 mt-4 w-full lg:text-base text-sm text-[#333333]"
                  >
                    {social_loading.apple ? (
                      <div>
                        <Loader />
                      </div>
                    ) : (
                      <>
                        <Image src={Apple} alt="" /> <h1>Sign in with Apple</h1>
                      </>
                    )}
                  </button>
                )}
              /> */}
              <button
                onClick={() => googleLogin()}
                className="bg-white border border-black flex justify-center items-center space-x-4 rounded-full lg:p-4 px-2 py-3 mt-4 w-full lg:text-base text-sm  text-[#333333]"
              >
                {social_loading.google ? (
                  <div>
                    <Loader />
                  </div>
                ) : (
                  <>
                    <img src="/assets/Svg/Social/google.svg" alt="" />{" "}
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
                <div
                  onClick={handlePasswordType}
                  className="mr-4 cursor-pointer"
                >
                  {/* {passwordType !== "password" ? <FaEye /> : <FaEyeSlash />} */}
                  {passwordType !== "password" ? (
                    <span className="text-na_blue text-sm tracking-wide pointer underline font-normal">
                      Hide
                    </span>
                  ) : (
                    <span className="text-na_blue text-sm tracking-wide pointer underline font-normal">
                      Show
                    </span>
                  )}
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
                loading={isPending}
                disabled={isPending}
                className="flex justify-center bg-na_blue rounded-full p-4 mt-4 w-full text-[#ffffff]"
              >
                Login
              </Button>
            </form>
            <div className={"text-center pb-6"}>
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
    </>
  );
}
