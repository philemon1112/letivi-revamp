import Link from "next/link";
import React from "react";

interface SuccessRegProps {
  name: string;
  isDefaultProvider: boolean;
  email: string;
  provider: string;
}

function SuccessReg({
  name,
  isDefaultProvider,
  email,
  provider,
}: SuccessRegProps) {
  return (
    <div>
      <div className="flex justify-center text-center flex-col text-black lg:py-20 py-10 mx-auto max-w-lg">
        <img
          src="/assets/Svg/success.svg"
          alt="success"
          className="h-20 w-20 mx-auto mb-6"
        />
        <h1 className="lg:text-4xl  text-2xl font-medium mb-10">
          Yes! One more step to go 🙂
        </h1>

        <p className="lg:text-xl text-sm font-medium mb-5">
          Thank you for signing up for Letivi, {name}!{" "}
          {isDefaultProvider && (
            <span className="pt-3">
              Kindly check your email <span color={"#1184C1"}>{email} </span>
              or your spam to activate your Letivi account!
            </span>
          )}
        </p>

        <div className="flex justify-around items-stretch lg:space-x-2 space-x-4 mt-6.">
          <Link href="https://www.facebook.com/letivieverywhere/">
            <img src="/assets/Svg/Social/fb.svg" alt="" className="h-10 w-10" />
          </Link>
          <Link href="https://www.twitter.com/letiviapp">
            <img
              src="/assets/Svg/Social/twitter.svg"
              alt=""
              className="w-10 h-10 "
            />
          </Link>
          <Link href="https://www.linkedin.com/company/letiviapp/">
            <img
              src="/assets/Svg/Social/linkedin.svg"
              className="h-10 w-10 -mt-[1px]"
              alt=""
            />
          </Link>
          <Link href="https://youtube.com/@Letivieverywhere">
            <img
              src="/assets/Svg/Social/yt.svg"
              alt=""
              className="w-10 h-10 "
            />
          </Link>
          <Link href="https://www.instagram.com/letiviapp/">
            <img
              src="/assets/Svg/Social/instagram.svg"
              alt=""
              className="w-10 h-10 "
            />
          </Link>
          <Link href="https://www.tiktok.com/@letiviapp">
            <img
              src="/assets/Svg/Social/tiktok.svg"
              alt=""
              className="w-10 h-10 "
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuccessReg;
