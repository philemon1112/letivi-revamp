/* eslint-disable react/no-unescaped-entities */
import React from "react";
import BaseTemplate from "../BaseTemplate";

function AboutTemplate() {
  return (
    <BaseTemplate>
      <div className="bg-gray-100 na_bg2  bg-fixed about min-h-screen flex justify-center items-center py-10  lg:p-[115px] ">
        <div className="bg-white bg-opacity-80 rounded-[20px] p-6 max-w-[1400px]">
          <div className="bg-white rounded-[20px] p-8 lg:p-[50px] flex justify-center items-center flex-col">
            <h1 className="lg:text-4xl text-2xl text-center font-semibold  my-10">
              About Us
            </h1>

            <h1 className="lg:text-2xl text-xs mb-6">
              Letivi is a high-resolution media archiving solution—built for
              professionals who need an organized, long-term, searchable archive
              of their profiles, bios, and multimedia content. With
              high-resolution galleries, collaborative workspaces, private
              uploads, and high-resolution downloads, Letivi lets allows users
              to enrich their high-resolution media asset with metadata,
              generate SEO-friendly URLs, and automatically tag media for
              maximum web visibility. Unlike traditional social platforms, it’s
              designed as a dedicated archive that they control and own
            </h1>

            <div className="lg:text-2xl text-xs mb-6">
              But Letivi goes beyond just personal profiles. It's a dynamic
              platform that caters to businesses, organisations, and projects as
              well. You can create dedicated accounts for your ventures,
              enabling you to showcase your brand with high-quality images,
              captivating descriptions, and even create press releases featuring
              your logo.
            </div>

            <div className="lg:text-2xl text-xs mb-6">
              For creatives and publications, Letivi serves as a treasure trove
              of high-resolution photos and videos. It spans a wide range of
              captivating categories such as nature, lifestyle, education,
              climate change, tourism, sports, food, culture, and people. Letivi
              empowers storytellers to weave 21st-century narratives that
              celebrate diversity and inclusion. It highlights notable figures,
              vibrant cultures, and picturesque lifestyles found across
              continents, perfect for captivating publications.
            </div>

            <div className="lg:text-2xl text-xs  mb-6">
              The future of storytelling is incredibly promising, and Letivi is
              at the forefront of this exciting revolution. Stay connected with
              us to embark on an exhilarating journey of visual storytelling!
            </div>
          </div>
        </div>
      </div>
    </BaseTemplate>
  );
}

export default AboutTemplate;
