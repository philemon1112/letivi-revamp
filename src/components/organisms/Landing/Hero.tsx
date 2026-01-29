"use client";
import { Button } from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Link from "next/link";
import React from "react";
// import { useTranslation } from "react-i18next";

function Herodiv() {
  const currentUser = useCurrentUser();
  const photogallery = [
    {
      id: 1,
      imageUrl: "/assets/Img/Stylish-guy-with-skateboard-1190669.webp",
    },
    {
      id: 2,
      imageUrl: "/assets/Img/GiraffeCompress.webp",
    },
    {
      id: 3,
      imageUrl: "/assets/Img/Man-standing-with-hands-clasped-1085213.webp",
    },
    {
      id: 4,
      imageUrl: "/assets/Img/Dry-yellow-flowers-in-a-black-vase-1129100.webp",
    },
    {
      id: 5,
      imageUrl: "/assets/Img/portrait-of-compress.webp",
    },
    {
      id: 6,
      imageUrl: "/assets/Img/happy-smiling-woman-compress.webp",
    },
    {
      id: 7,
      imageUrl: "/assets/Img/Portrait-compress.webp",
    },
    {
      id: 8,
      imageUrl: "/assets/Img/Woman-doing-side-plank-1002320.webp",
    },
  ];

  // const { t } = useTranslation();

  return (
    <div className="bg-white pb-1 sm:pb-2 lg:pb-4">
      <div className="mx-auto px-4 pt-10 sm:max-w-xl md:max-w-full md:px-8 lg:py-20 xl:px-20">
        <div className="flex flex-col justify-between gap-6 md:items-center sm:gap-10 md:gap-10 lg:flex-row">
          {/* <!-- content - start --> */}
          <div className="flex flex-col  justify-between  xl:w-5/12 order-2 lg:order-1">
            {/* <div></div> */}
            <div className="sm:text-center lg:py-12 lg:text-left xl:py-24 md:mt-10">
              <Typography
                weight={700}
                className="mb-8 text-4xl font-bold text-black sm:text-4xl md:mb-12 md:text-5xl truncate lg:text-6xl  md:!leading-[65px]"
              >
                Archive. <br /> Showcase. <br /> Be Discovered.
              </Typography>
              <div className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 lg:justify-start mb-4">
                {currentUser?.id ? (
                  <Link href="/explore">
                    <Button
                      variant="tertiary"
                      className="rounded-md lg:px-8 px-4 sm:px-4"
                      size="2xl"
                    >
                      {currentUser?.id ? "Explore" : "Get Started"}
                      {/* {currentUser?.id ? "Explore" : t("common:explore")} */}
                    </Button>
                  </Link>
                ) : (
                  <Link href={"/signup"}>
                    <Button
                      variant="tertiary"
                      className="rounded-md lg:px-8 px-4 sm:px-4"
                      size="2xl"
                    >
                      {currentUser?.id ? "Explore" : "Get Started"}
                      {/* {currentUser?.id ? "Explore" : t("common:explore")} */}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          {/* <!-- content - end -->

          <!-- image - start --> */}
          <div className=" overflow-hidden lg:h-auto xl:w-6/12 order-1 mt-10  lg:order-2">
            <div className="columns-3 gap-2 ...">
              {photogallery.map((item) => (
                <div key={item?.id} className="group">
                  <Link href="explore">
                    <img
                      className=" w-full m-2 aspect-auto object-cover object-center transition duration-200 group-hover:scale-105 rounded-lg"
                      src={item?.imageUrl}
                      alt={`Hero Image`}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Herodiv;
