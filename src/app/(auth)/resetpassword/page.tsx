"use client";

/* eslint-disable */
import React, { useState, useEffect } from "react";
// import Button from "../../Components/UI/Button";
import logo from "../../assets/Svg/logo.png";
import axios from "axios";
// import axios from "../../Utils/axios";
import upload_success from "../../../../public/assets/Svg/upload_success.svg";
// import { Link } from "react-router-dom";
import toast from "react-hot-toast";
// import { Center } from "@chakra-ui/react";
import AppLogo from "@/components/molecules/AppLogo";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";
// import AppLogo from "Components/UI/AppLogo";

export default function Index() {
  const [token, setToken] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams) setToken(queryParams.get("token"));
    if (queryParams) setOtp(queryParams.get("otp"));
    // const password_reset_token = JSON.parse(localStorage.getItem('password_reset_token'));
    // if(password_reset_token) setToken(password_reset_token);
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChecker, setPasswordChecker] = useState(true);
  const [password, setPassword] = useState<string>("");
  const [resetSuccessfull, setResetSuccessfull] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordValidity, setPasswordValidity] = useState("");

  const apiSecret = "s0meR3ndomP@$$Word";

  const handlePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 6) {
      setPassword(e.target.value);
      setPasswordValidity("");
    } else {
      setPasswordValidity("Password must be atleast 7 characters");
    }
  };

  const handleResetPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const passwordResetParams = {
      otp,
      token,
      new_password: password,
      confirm_password: confirmPassword,
    };

    if (confirmPassword !== password) {
      setPasswordChecker(!passwordChecker);
    } else {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/passwordreset`,
          passwordResetParams,
          {
            headers: {
              "x-api-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
              "x-api-secret": apiSecret,
            },
          }
        )
        .then((res) => {
          setResetSuccessfull(true);
        })
        .catch((err) => {
          setError(true);
          setMessage(err.response.data.message);
          toast.error(err.response.data.message);
        });
    }
  };

  return (
    <div className="bg-gray-100 na_bg2 auth h-screen flex justify-center items-center p-4 lg:p-[115px] ">
      <div className="bg-white shadow-2xl bg-opacity-90 rounded-[20px] py-9 lg:max-w-[700px] w-full">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center">
            <AppLogo responsive={false} image={false} />
          </div>
          {/* <Center></Center> */}
          <h1 className="text-center font-medium lg:text-2xl text-base mt-6">
            New Password
          </h1>
        </div>
        <div className="lg:px-[100px] px-[30px]">
          {!resetSuccessfull ? (
            <form className="mt-10" onSubmit={handleResetPassword}>
              <div className="flex justify-between items-center">
                <label htmlFor="Password" className="text-[#666666]">
                  Password
                </label>
                <div
                  onClick={handlePasswordType}
                  className="mr-4 cursor-pointer"
                >
                  <i
                    className={`fa ${
                      passwordType !== "password" ? "fa-eye" : "fa-eye-slash"
                    } text-[#666666]`}
                  ></i>
                </div>
              </div>

              <input
                type={passwordType}
                required
                onChange={(e) => handlePasswordCheck(e)}
                placeholder="Password"
                id="full_name"
                className="input"
              />
              {passwordValidity && (
                <h1 className="text-red-500 -mt-3 mb-3 text-sm">
                  {" "}
                  {passwordValidity}{" "}
                </h1>
              )}

              <div className="flex justify-between items-center">
                <label htmlFor="Password" className="text-[#666666]">
                  Confirm Password
                </label>
                <div
                  onClick={handlePasswordType}
                  className="mr-4 cursor-pointer"
                >
                  <i
                    className={`fa ${
                      passwordType !== "password" ? "fa-eye" : "fa-eye-slash"
                    } text-[#666666]`}
                  ></i>
                </div>
              </div>
              <div>
                <input
                  type={passwordType}
                  placeholder="Confirm password"
                  required
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  id="password"
                  className="input"
                />
                {!passwordChecker && (
                  <p className="text-red-500 text-xs lg:text-sm ">
                    Passwords does not match
                  </p>
                )}
              </div>

              {error && <h1 className="text-red-500"> {message} </h1>}

              {/* <Button
                loading={loading}
                label={"Reset Password"}
              /> */}
              <Button
                size="xl"
                className="w-full rounded-full"
                loading={loading}
              >
                Reset Password
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              <img src={upload_success} alt="" className="mx-auto my-5" />
              <h1 className="text-2xl font-semibold">Password Updated</h1>

              <p className="my-10">
                Your password has been successfuly updated
              </p>

              <Link
                href="/login"
                className="flex justify-center bg-na_blue rounded-full p-4 mt-4 w-full text-[#ffffff]"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
