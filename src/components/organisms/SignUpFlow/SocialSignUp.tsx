"use client";
import React, { useState } from "react";
import Loader from "@/components/atoms/Loader";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth";
import Google from "@/assets/Svg/Social/google.svg";
import Image from "next/image";

function SocialSignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState({
    google: false,
    apple: false,
  });

  const socialLoginHandler = async (credential: string, provider: string) => {
    setLoading({ ...loading, [provider]: true });
    const loginData = {
      meta: { token: credential },
      signin_mode: provider,
    };

    try {
      const data = await loginUser(loginData);
      if (data?.token) {
        toast.error("User already exists, Log into account");
        setLoading({ ...loading, [provider]: false });
        router.push("/login");
      }
    } catch (error: any) {
      setLoading({ ...loading, [provider]: false });
      if (
        error.response.data?.status === 404 ||
        error.response.data.status === 403
      ) {
        router.push("/social-registration");
      }
    }
  };

  // const appleSignUp = (response) => {
  //   const apple_user = {};
  //   apple_user.id_token = response?.authorization.id_token;
  //   if (response.user) {
  //     apple_user.first_name = response.user.name.firstName;
  //     apple_user.last_name = response.user.name.lastName;
  //     apple_user.email = response.user.email;
  //   }
  //   let login_provider = "apple";
  //   const url = "/apple/login";
  //   socialLoginHandler(apple_user.id_token, url, "apple");
  //   localStorage.setItem("login_provider", JSON.stringify(login_provider));
  //   localStorage.setItem("apple_user", JSON.stringify(apple_user));
  // };

  const googleSignup = useGoogleLogin({
    onSuccess: (response) => {
      const token = response.access_token;
      let login_provider = "google";
      socialLoginHandler(token, "google");
      localStorage.setItem("login_provider", JSON.stringify(login_provider));
      localStorage.setItem("user_access_token", JSON.stringify(token));
    },
    onError: (response) => {},
  });

  return (
    <div className="flex flex-col lg:flex-row items-center lg:space-x-4 mt-6">
      {/* <AppleLogin
        clientId={`${process.env.REACT_APP_APPLE_ID_PROD}`}
        redirectURI={`${process.env.REACT_APP_FRONTEND_BASE_URL}/signup`}
        scope="email name"
        state="state"
        usePopup={true}
        callback={appleSignUp}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className="bg-white border border-black flex justify-center items-center space-x-4 rounded-full lg:p-4 p-2 mt-4 lg:text-base text-sm w-full text-[#333333]"
          >
            {loading.apple ? (
              <div>
                <Loader />
              </div>
            ) : (
              <>
                <img src={Apple} alt="" /> <h1>Sign up with Apple</h1>
              </>
            )}
          </button>
        )}
      /> */}
      <button
        onClick={() => googleSignup()}
        className="bg-white border border-black flex justify-center items-center space-x-3 rounded-full lg:p-5 p-3 mt-4 lg:text-base text-sm w-full text-[#333333]"
      >
        {loading.google ? (
          <div>
            <Loader />
          </div>
        ) : (
          <>
            <img src={"/assets/Svg/Social/google.svg"} alt="" />{" "}
            <h1>Sign up with Google</h1>
          </>
        )}
      </button>
    </div>
  );
}

export default SocialSignUp;
