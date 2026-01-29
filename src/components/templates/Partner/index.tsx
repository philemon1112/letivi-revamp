import React from "react";
import BaseTemplate from "../BaseTemplate";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";

function index() {
  return (
    <BaseTemplate>
      <div className="bg-gray-100 na_bg2  bg-fixed about min-h-screen flex justify-center items-center py-10  lg:p-[115px] ">
        <div className="bg-white bg-opacity-80 rounded-[20px] p-6 max-w-[1400px]">
          <div className="bg-white rounded-[20px] px-8 pt-8 lg:pb-24 pb-10  lg:p-[50px] flex  flex-col">
            <h1 className="lg:text-4xl text-2xl text-center font-semibold  my-10">
              Partner With Us{" "}
            </h1>

            <h1 className="lg:text-2xl text-xs mb-4">
              At Letivi, we believe creating lasting solutions requires
              sustainable partnership. Thus, we are excited to collaborate with
              individuals and organisations who are interested in using videos,
              photos and stories in a campaign to tackle social problems to meet
              the 2030 sustainable development agenda.
            </h1>
          </div>

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
    </BaseTemplate>
  );
}

export default index;
