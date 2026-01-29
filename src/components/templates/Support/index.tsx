"use client";

import { Button } from "@/components/atoms/Button";
import React from "react";
// import { useTranslation } from "react-i18next";
import BaseTemplate from "../BaseTemplate";
import Link from "next/link";

function Support() {
 // const { t } = useTranslation();

  return (
    <BaseTemplate>
      <div className="bg-gray-100 na_bg2  bg-fixed about min-h-screen flex justify-center items-center py-10  lg:p-[115px] ">
        <div className="bg-white bg-opacity-80 rounded-[20px] p-6 max-w-[1400px]">
          <div className="bg-white rounded-[20px] p-8 lg:p-[50px] flex flex-col">
            <h1 className="lg:text-4xl text-2xl text-center font-semibold  my-10">
              Support Us
            </h1>

            <h1 className="lg:text-2xl text-xs mb-4">
              At Letivi, we believe storytelling is important to our identity
              and culture as it is a great way to empower the next generation.
              By supporting Letivi, you will be empowering content creators
              around the world who are interested in telling impactful stories.
            </h1>
            <h1 className="lg:text-2xl text-xs mb-4">
              Individuals and organisations can support Letivi in number of
              ways;
            </h1>
            <ul className="list-disc font-semibold lg:pl-10 pl-7 lg:text-2xl text-xs  mb-4">
              <li> Donation</li>
            </ul>

            <h1 className="lg:text-2xl text-xs mb-4">
              Individuals and organisations can donate historical archives of
              videos and photos of a country’s past presidents or past icons and
              institutions to help content creators tell inspiring stories.
            </h1>

            <ul className="list-disc font-semibold lg:pl-10 pl-7 lg:text-2xl text-xs  mb-4">
              <li> Volunteers</li>
            </ul>
            <h1 className="lg:text-2xl text-xs mb-4">
              Individuals and organisations can volunteer to train young people
              in filmmaking, photography and writing during our content creation
              workshops.
            </h1>

            {/* <Link to="/contact" onClick={handleLinkClick}>
            <button className="flex justify-center bg-na_blue rounded-lg py-4 px-24 mx-auto mt-4 md:mt-8 max-w-max text-[#ffffff]">
              Contact Us
            </button>
          </Link> */}

            <Link href="/contact">
              <Button
                variant="primary"
                size="2xl"
                className="flex justify-center rounded-lg text-[10px] py-1 px-24 mx-auto mt-4 md:mt-8 max-w-max"
              >
                {/* {t("common:contact_us")} */}
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </BaseTemplate>
  );
}

export default Support;
