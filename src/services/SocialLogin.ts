"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

// export const loginMutation = useMutation(
//   async (loginParams: { email: string; password: string }) => {
//     return axios.post(`${process.env.NEXT_API_BASE_URL}/login`, loginParams);
//   }
// );

// const loginMutation = useMutation((loginParams) =>
//   axios.post(`${process.env.NEXT_API_BASE_URL}/login`, loginParams)
// );

// export const socialLoginHandler = async (credential, provider) => {
//   const [social_loading, setSocial_Loading] = useState({
//     google: false,
//     apple: false,
//   });

//   const router = useRouter();
//   setSocial_Loading((prevLoading) => ({ ...prevLoading, [provider]: true }));
//   try {
//     const res = await axios.post(`${process.env.NEXT_API_BASE_URL}/login`, {
//       signin_mode: provider,
//       meta: { token: credential },
//     });
//     toast.success("Login Successful");
//     let redirectPath = router.query.redirect || "/feed";
//     router.push(redirectPath);
//   } catch (error) {
//     toast.error(
//       `${error.response.data.message}, create an account before sign in`
//     );
//   } finally {
//     setSocial_Loading((prevLoading) => ({ ...prevLoading, [provider]: false }));
//   }
// };
