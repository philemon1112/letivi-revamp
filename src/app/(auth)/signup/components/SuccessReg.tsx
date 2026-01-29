import React from "react";
import success from "../../../../public/assets/Svg/success.svg";
import fb from "../../../../public/assets/Svg/Social/fb.svg";
import twitter from "../../../../public/assets/Svg/Social/twitter.svg";
import linkedin from "../../../../public/assets/Svg/Social/linkedin.svg";
import instagram from "../../../../public/assets/Svg/Social/instagram.svg";
import YT from "../../../../public/assets/Svg/Social/yt.svg";
import tiktok from "../../../../public/assets/Svg/Social/tiktok.svg";
// import twitter from "../../../assets/Svg/Social/twitter.svg";
// import linkedin from "../../../assets/Svg/Social/linkedin.svg";
// import instagram from "../../../assets/Svg/Social/instagram.svg";
// import YT from "../../../assets/Svg/Social/yt.svg";
// import tiktok from "../../../assets/Svg/Social/tiktok.svg";
// import { Link } from "react-router-dom";
// import { Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

interface SuccessRegProps {
  name: string;
  isDefaultProvider: boolean;
  email: string;
}

function SuccessReg({ name, isDefaultProvider, email }: SuccessRegProps) {
  return (
    <div>
      <div className="flex justify-center text-center flex-col text-black lg:py-20 py-10 mx-auto max-w-lg">
        <img src={success} alt="" className="h-20 w-20 mx-auto mb-6" />
        <h1 className="lg:text-4xl  text-2xl font-medium mb-10">
          Yes! One more step to go 🙂 here
        </h1>

        <p className="lg:text-xl text-sm font-medium mb-5">
          Thank you for signing up for Letivi, {name}!
          {/* {isDefaultProvider && (
            <Text pt={3}>
              Kindly check your email{" "}
              <Text
                color={"#1184C1"}
                as={"span"}
              >
                {email}
              </Text>{" "}
              or your spam to activate your Letivi account!
            </Text>
          )} */}
        </p>

        {/*<h2 className="lg:text-xl text-sm ">*/}
        {/*  The entire team here at Notion Africa welcomes you on board :)*/}
        {/*  {provider === "notion_africa" && (*/}
        {/*    <span className="mx-1">*/}
        {/*      In order to get full access to the Notion Africa platform. All you*/}
        {/*      need to do is activate your account with the activation link sent*/}
        {/*      to your email.*/}
        {/*    </span>*/}
        {/*  )}*/}
        {/*</h2>*/}

        {/*<h1 className="lg:text-xl text-sm font-medium  my-6">*/}
        {/*  We're glad you're here.*/}
        {/*</h1>*/}

        <Link href={"/login"} className="text-na_blue my-5">
          Back to Login
        </Link>

        <div className="flex justify-around items-stretch lg:space-x-2 space-x-4 mt-6.">
          <a href="https://www.facebook.com/letivieverywhere/">
            <Image src={fb} alt="" className="h-10 w-10  " />
          </a>
          <a href="https://www.twitter.com/letiviapp">
            <Image src={twitter} alt="" className="w-10 h-10 " />
          </a>
          <a href="https://www.linkedin.com/company/letiviapp/">
            <Image src={linkedin} className="h-10 w-10 -mt-[1px]" alt="" />
          </a>
          <a href="https://youtube.com/@Letivieverywhere">
            <Image src={YT} alt="" className="w-10 h-10 " />
          </a>
          <a href="https://www.instagram.com/letiviapp/">
            <Image src={instagram} alt="" className="w-10 h-10 " />
          </a>
          <a href="https://www.tiktok.com/@letiviapp">
            <Image src={tiktok} alt="" className="w-10 h-10 " />
          </a>
        </div>
      </div>
    </div>
  );
}

export default SuccessReg;
