"use client";
import Typography from "@/components/atoms/Typography";
import Image from "next/image";
import React from "react";
// import { useTranslation } from "react-i18next";

function HowITWorks() {
  // const { t } = useTranslation();
  return (
    <div>
      <div className="">
        <div className="px-4 py-4 mx-auto max-w-screen-xl sm:px-6 md:px-8 lg:px-4 lg:py-24">
          <div className=" py-2 mb-4 lg:py-10">
            <Typography weight={600} className="text-2xl md:text-4xl">
              How Letivi Works
              {/* {t("how_it_works")} */}
            </Typography>
          </div>
          <div className="flex flex-wrap mx-auto max-w-screen-xl ">
            <div className="flex flex-col items-start md:mt-12 mb-16 md:text-left lg:flex-grow lg:w-1/2  md:mb-0 xl:mt-0">
              <dl className="grid grid-cols-2 gap-y-8 gap-x-8 md:grid-cols-2">
                <div>
                  <dt className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-5 ">
                    <Image
                      src="/assets/Img/sign-up.gif"
                      alt="info icon"
                      className="w-10 h-10 md:w-12 md:h-12"
                      width={120}
                      height={120}
                      unoptimized
                    />
                  </dt>
                  <dd className="flex-grow">
                    <Typography
                      weight={500}
                      className="mb-3 text-lg font-medium tracking-tighter text-black"
                    >
                      Sign up.
                      {/* {t("sign_up")}. */}
                    </Typography>
                    <Typography
                      weight={400}
                      className="text-base leading-relaxed text-gray-800"
                    >
                      Create an account using <br /> Google, Apple, or fill a
                      form
                      {/* {t("sign_up_text1")} <br /> {t("sign_up_text2")}. */}
                    </Typography>
                  </dd>
                </div>
                <div>
                  <dt className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-5">
                    <Image
                      src="/assets/Img/profile-photo.gif"
                      alt="info icon"
                      className="w-10 h-10 md:w-12 md:h-12"
                      width={120}
                      height={120}
                      unoptimized
                    />
                  </dt>
                  <dd className="flex-grow">
                    <h2 className="mb-3 text-lg font-medium tracking-tighter text-black">
                      {/* {t("upload_photo")} */}
                      Upload Profile Photo
                    </h2>
                    <p className="text-base leading-relaxed text-gray-800">
                      Add a profile picture to personalize <br />{" "}
                      {/* {t("upload_text2")}. */} your account.
                      {/* {t("upload_text1")} <br /> {t("upload_text2")}. */}
                    </p>
                  </dd>
                </div>
                <div>
                  <dt className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-5">
                    <Image
                      src="/assets/Img/privacy.gif"
                      alt="info icon"
                      className="w-10 h-10 md:w-12 md:h-12"
                      width={120}
                      height={120}
                      unoptimized
                    />
                  </dt>
                  <dd className="flex-grow">
                    <h2 className="mb-3 text-lg font-medium tracking-tighter text-black">
                      Set Privacy
                      {/* {t("set_privacy")} */}
                    </h2>
                    <p className="text-base leading-relaxed text-gray-800">
                      Choose between private or public account (public allows
                      searchability).
                    </p>
                  </dd>
                </div>
                <div>
                  <dt className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-5">
                    <Image
                      src="/assets/Img/add-bio.gif"
                      alt="info icon"
                      className="w-10 h-10 md:w-12 md:h-12"
                      width={120}
                      height={120}
                      unoptimized
                    />
                  </dt>
                  <dd className="flex-grow">
                    <h2 className="mb-3 text-lg font-medium tracking-tighter text-black">
                      Add Bio
                    </h2>
                    <p className="text-base leading-relaxed text-gray-800">
                      Upload a bio or let Letivi generate one for you.
                    </p>
                  </dd>
                </div>
                <div>
                  <dt className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-5">
                    <Image
                      src="/assets/Img/business.gif"
                      alt="info icon"
                      className="w-10 h-10 md:w-12 md:h-12"
                      width={120}
                      height={120}
                      unoptimized
                    />
                  </dt>
                  <dd className="flex-grow">
                    <h2 className="mb-3 text-lg font-medium tracking-tighter text-black">
                      Upload Career Highlights
                    </h2>
                    <p className="text-base leading-relaxed text-gray-800">
                      Add stunning photos and videos of your career highlights,
                      along with their stories.
                    </p>
                  </dd>
                </div>
                <div>
                  <dt className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-5">
                    <Image
                      src="/assets/Img/headshot.gif"
                      alt="info icon"
                      className="w-10 h-10 md:w-12 md:h-12"
                      width={120}
                      height={120}
                      unoptimized
                    />
                  </dt>
                  <dd className="flex-grow">
                    <h2 className="mb-3 text-lg font-medium tracking-tighter text-black">
                      Upload Headshots
                    </h2>
                    <p className="text-base leading-relaxed text-gray-800">
                      Share two or more headshots as <br /> cover photos.
                    </p>
                  </dd>
                </div>
                <div>
                  <dt className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-5 ">
                    <Image
                      src="/assets/Img/share.gif"
                      alt="info icon"
                      className="w-10 h-10 md:w-12 md:h-12"
                      width={120}
                      height={120}
                      unoptimized
                    />
                  </dt>
                  <dd className="flex-grow">
                    <h2 className="mb-3 text-lg font-medium tracking-tighter text-black">
                      Share Your Profile
                    </h2>
                    <p className="text-base leading-relaxed text-gray-800">
                      Spread the word by sharing your profile through email,
                      social media or by copying the link.
                    </p>
                  </dd>
                </div>
                <div>
                  <dt className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-5 ">
                    <Image
                      src="/assets/Img/workspace.gif"
                      alt="info icon"
                      className="w-10 h-10 md:w-12 md:h-12"
                      width={120}
                      height={120}
                      unoptimized
                    />
                  </dt>
                  <dd className="flex-grow">
                    <h2 className="mb-3 text-lg font-medium tracking-tighter text-black">
                      Get A Workspace
                    </h2>
                    <p className="text-base leading-relaxed text-gray-800">
                      Create a workspace to store high-resolution photos and
                      videos for organisations, projects, or events.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="w-full lg:max-w-md lg:w-1/2 rounded-xl hidden md:flex">
              <div>
                <div className="relative w-full max-w-lg">
                  <div className="relative">
                    <img
                      className="object-cover object-center mx-auto w-64 md:w-96"
                      alt="hero"
                      src="/assets/Img/phoneMockup.webp"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowITWorks;
