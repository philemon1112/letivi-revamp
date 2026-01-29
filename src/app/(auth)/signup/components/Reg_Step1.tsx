"use client";

import React, { useState } from "react";
// import axios from "../../../Utils/axios";
// import { endpoints } from "../../../Utils/endpoints";
// import Google from "../../assets/Svg/Social/google.svg";
// import { Link } from "react-router-dom";
// import Stage from "./Stage";
// import Loader from "Components/UI/Loader";
import SocialSignUp from "./SocialSignUp";
// import { FormattedMessage } from "react-intl";
// import { Box, Flex, Text } from "@chakra-ui/react";
import Loader from "@/components/atoms/Loader";
import Link from "next/link";
import { endpoints } from "@/utils/endpoints";
import axios from "axios";

interface IndexProps {
  steps: any;
  step: any;
  nextPageHandler: () => void;
  setEmail: (email: string) => void;
  setFirst_name: (firstName: string) => void;
  setLast_name: (lastName: string) => void;
  last_name: string;
  first_name: string;
  email: string;
  setProvider: (provider: string) => void;
  setSub: (sub: string) => void;
  inviter_id: string | null;
}

export default function Index({
  steps,
  step,
  nextPageHandler,
  setEmail,
  setFirst_name,
  setLast_name,
  last_name,
  first_name,
  email,
  setProvider,
  setSub,
  inviter_id,
}: IndexProps) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifier = async (email_account: any) => {
    let isError;
    setLoading(true);

    await axios
      .post(endpoints.validateEmail, {
        email: email_account,
      })
      .then((res) => {
        setLoading(false);
        isError = true;
        setError(true);
      })
      .catch((err) => {
        setLoading(false);
        setMessage(err.response.data.message);
        isError = false;
        setError(false);
      });
    if (isError) {
      nextPageHandler();
    }
  };

  const nextHandler = async () => {
    let isEmailExist;
    setLoading(true);

    await axios
      .post(endpoints.validateEmail, {
        email,
      })
      .then((res) => {
        setLoading(false);
        // ;
        isEmailExist = false;
        setError(false);
      })
      .catch((err) => {
        setLoading(false);
        setMessage(err.response.data.message);
        isEmailExist = true;
        setError(true);
      });
    if (!isEmailExist) {
      nextPageHandler();
    }
  };

  const proceed = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    nextHandler();
  };
  return (
    <div className="lg:px-[200px]">
      <div className="mb-5">
        <h1 className="text-center font-medium lg:text-2xl text-base mt-2">
          Create an account and gain full access
        </h1>
        <div className="text-center">
          Already have an account?
          <Link className="text-na_blue ml-1" href="/login">
            Log in
          </Link>
        </div>
      </div>
      {/* <Stage
        steps={steps}
        step={step}
      /> */}
      {/* <SocialSignUp
        setLast_name={setLast_name}
        setProvider={setProvider}
        verifier={verifier}
        setFirst_name={setFirst_name}
        setEmail={setEmail}
        inviter_id={inviter_id}
      /> */}
      {/* <Flex
        my={4}
        mx={5}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          flex={1}
          h={"1px"}
          bg={"#bdbdbd"}
        />
        <Text
          px={3}
          py={1}
        >
          OR {inviter_id}
        </Text>
        <Box
          flex={1}
          h={"1px"}
          bg={"#bdbdbd"}
        />
      </Flex> */}
      <div className="flex my-4 mx-5 justify-between items-center">
        <div className="flex h-1 ">
          <p>OR {inviter_id}</p>
        </div>
      </div>
      <div className="mt-6">
        <form onSubmit={proceed}>
          <label htmlFor="first_name" className="text-[#666666]">
            {/* <FormattedMessage
              id={"app.Text.first-name"}
              defaultMessage={"  First Name*"}
            /> */}
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            id="first_name"
            value={first_name}
            required
            onChange={(e) => {
              setFirst_name(e.target.value);
            }}
            className="input"
          />
          <label htmlFor="last_name" className="text-[#666666]">
            Last Name*
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            id="last_name"
            value={last_name}
            required
            onChange={(e) => {
              setLast_name(e.target.value);
            }}
            className="input"
          />
          <label htmlFor="email" className="mt-4 text-[#666666]">
            What’s your email?*
          </label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email adderess"
            id="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="input"
          />

          {error && <h1 className="text-red-500"> {message} </h1>}

          <button className="bg-na_blue rounded-full flex justify-center p-4 mt-4 mb-16 w-full text-[#ffffff]">
            {loading ? <Loader /> : "Next"}
          </button>
        </form>
      </div>
    </div>
  );
}
