import React, { useState } from "react";
import AppleLogin from "react-apple-login";
import { useGoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// import axios from "../../../Utils/axios";
import Google from "../../../../public/assets/Svg/Social/google.svg";
import Apple from "../../../../public/assets/Svg/Social/apple.svg";
// import { Center } from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import Loader from "@/components/atoms/Loader";
import { useRouter } from "next/navigation";

function SocialSignUp({ inviter_id }: { inviter_id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState({
    google: false,
    apple: false,
  });
  // const dispatch = useDispatch();

  // const apiKey = process.env.REACT_APP_API_KEY;
  // const apiUrl = "https://a2c7-102-176-75-91.ngrok-free.app/api/v1/users/signup";
  // const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/login`;
  // const apiSecret = process.env.REACT_APP_API_SECRET;

  const apiKey = "letivi-2023-v1";
  const apiUrl = "https://api.staging.letivi.com/api/v1/login";
  const apiSecret = "s0meR3ndomP@$$Word";

  const socialLoginHandler = (
    credential: string | undefined,
    url: string,
    provider: string
  ) => {
    setLoading({ ...loading, [provider]: true });
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
        {
          signin_mode: provider,
          meta: {
            token: credential,
          },
        },
        {
          headers: {
            "x-api-key": apiKey,
            "x-api-secret": apiSecret,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.error("User already exists, Log into account");
        setLoading({ ...loading, [provider]: false });
      })
      .catch((err) => {
        console.log("error", err);
        setLoading({ ...loading, [provider]: false });
        if (err.response?.data?.status === 403) {
          router.push("/socialAuth-registration");
        }
      });
  };

  const googleSignup = useGoogleLogin({
    onSuccess: (response) => {
      const token = response.access_token;
      let login_provider = "google";
      const url = "/googlelogin";
      socialLoginHandler(token, url, "google");
      localStorage.setItem("login_provider", JSON.stringify(login_provider));
      localStorage.setItem("user_access_token", JSON.stringify(token));
      localStorage.setItem("inviter_id", JSON.stringify(inviter_id));
    },
    onError: (response) => {},
  });

  const appleSignUp = (response: {
    authorization: { id_token: any };
    user: { name: { firstName: any; lastName: any }; email: any };
  }) => {
    const apple_user: {
      id_token?: string;
      first_name?: string;
      last_name?: string;
      email?: string;
    } = {};
    apple_user.id_token = response?.authorization?.id_token;
    if (response.user) {
      apple_user.first_name = response.user.name.firstName;
      apple_user.last_name = response.user.name.lastName;
      apple_user.email = response.user.email;
    }
    let login_provider = "apple";
    const url = "/apple/login";
    socialLoginHandler(apple_user.id_token, url, "apple");
    localStorage.setItem("login_provider", JSON.stringify(login_provider));
    localStorage.setItem("apple_user", JSON.stringify(apple_user));
    localStorage.setItem("inviter_id", JSON.stringify(inviter_id));
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:space-x-4 mt-6">
      <AppleLogin
        clientId={`${process.env.NEXT_PUBLIC_APPLE_ID_PROD}`}
        redirectURI={`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/signup`}
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
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : (
              <>
                <Image src={Apple} alt="" /> <h1>Sign up with Apple</h1>
              </>
            )}
          </button>
        )}
      />
      <button
        onClick={() => googleSignup()}
        className="bg-white border border-black flex justify-center items-center space-x-3 rounded-full lg:p-5 p-3 mt-4 lg:text-base text-sm w-full text-[#333333]"
      >
        {loading.google ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <>
            <Image src={Google} alt="" /> <h1>Sign up with Google</h1>
          </>
        )}
      </button>
    </div>
  );
}

export default SocialSignUp;
