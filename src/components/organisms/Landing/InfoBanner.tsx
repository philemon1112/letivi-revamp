"use client";
import Typography from "@/components/atoms/Typography";
import Image from "next/image";
import React from "react";
// import { useTranslation } from "react-i18next";

function InfoBanner() {
  // const { t } = useTranslation();
  return (
    <div className="bg-na_red text-white">
      <div className="mx-auto max-w-xl lg:max-w-screen-xl mb-12">
        <div className="py-14 px-3">
          <Typography
            weight={300}
            className="md:text-lg text-base pb-4 font-semibold"
          >
            Letivi unlocks the true value of the visual assets of brands, events
            and organisations by transforming dormant files into discoverable
            content. On Letivi, every pixel works harder, turning your
            high-resolution library into a living, breathing platform for
            discovery, collaboration and timeless storytelling.
          </Typography>
          <div className="flex mt-2 md:mt-5 flex-col md:flex-row md:justify-between md:items-start font-normal gap-6 md:gap-8">
            <div className="flex-1 flex flex-col items-start  mb-3">
              <Image
                src="/assets/Img/analytics.gif"
                alt="info icon"
                className="w-10 h-10 md:w-12 md:h-12"
                width={120}
                height={120}
                unoptimized
              />
              <Typography weight={300} className="md:text-base text-sm ">
                <span className="font-semibold text-base md:text-xl block mb-2">
                  Maximise Your Media&apos;s Impact
                </span>
                Never allow another captivating photograph or video to remain
                unseen. With Letivi&apos;s centralised, high-resolution library,
                you can effortlessly upload, organise and showcase every asset,
                ensuring your best moments are always ready to inspire and
                engage.
              </Typography>
            </div>

            <div className="flex-1 flex flex-col  mb-3">
              <Image
                src="/assets/Img/speed.gif"
                alt="info icon"
                className="w-10 h-10 md:w-12 md:h-12"
                width={120}
                height={120}
                unoptimized
              />
              <Typography weight={300} className="md:text-base text-sm ">
                <span className="font-semibold text-base md:text-xl block mb-2">
                  Professional Grade Quality, Every Time
                </span>
                Avoid the compromises of low-resolution social-media downloads
                or costly re-shoots. Letivi preserves the full fidelity of your
                original files, making them instantly available for high-end
                productions, presentations and campaigns.
              </Typography>
            </div>

            <div className="flex-1 flex flex-col mb-3">
              <Image
                src="/assets/Img/newspaper.gif"
                alt="info icon"
                className="w-10 h-10 md:w-12 md:h-12"
                width={120}
                height={120}
                unoptimized
              />
              <Typography weight={300} className="md:text-base text-sm ">
                <span className="font-semibold text-base md:text-xl block mb-2">
                  Tell the Full Story of Your Community and Beyond
                </span>
                Move beyond one-dimensional narratives. By capturing, tagging
                and celebrating authentic moments with rich metadata, Letivi
                elevates positive cultural, artistic and business stories,
                helping to shape a more balanced, vibrant view of your
                community.
              </Typography>
            </div>
          </div>

          <div className="flex flex-col mt-2 md:mt-5 md:flex-row md:justify-between md:items-start font-normal gap-6 md:gap-8">
            <div className="flex-1 flex flex-col mb-3">
              <Image
                src="/assets/Img/explode.gif"
                alt="info icon"
                className="w-10 h-10 md:w-12 md:h-12"
                width={120}
                height={120}
                unoptimized
              />
              <Typography weight={300} className="md:text-base text-sm ">
                <span className="font-semibold text-base md:text-xl block mb-2">
                  Automatic SEO & Metadata Magic
                </span>
                Every upload can be enriched with titles, descriptions and tags,
                and Letivi even generates SEO-friendly URLs for you. The result?
                Your gallery becomes a searchable, traffic-driving resource that
                attracts fresh audiences and opportunities.
              </Typography>
            </div>

            <div className="flex-1 flex flex-col items-start md:items-center mb-3">
              <Typography weight={300} className="md:text-base text-sm ">
                <Image
                  src="/assets/Img/folder.gif"
                  alt="info icon"
                  className="w-10 h-10 md:w-12 md:h-12"
                  width={120}
                  height={120}
                  unoptimized
                />
                <span className="font-semibold text-base md:text-xl block mb-2">
                  Unlimited, Flexible Galleries
                </span>
                Create as many public or private albums as you wish, without
                limits or hidden costs. Switch between “showcase” mode for
                clients and “vault” mode for internal teams, giving you complete
                control over visibility.
              </Typography>
            </div>

            <div className="flex-1 flex flex-col mb-3">
              <Image
                src="/assets/Img/attribution.gif"
                alt="info icon"
                className="w-10 h-10 md:w-12 md:h-12"
                width={120}
                height={120}
                unoptimized
              />
              <Typography weight={300} className="md:text-base text-sm ">
                <span className="font-semibold text-base md:text-xl block mb-2">
                  Showcase Your Expertise
                </span>
                Integrate your professional biography directly into your media
                profile. Highlight your roles, qualifications, published
                articles and social-media handles so every visitor can
                appreciate, and share, your full story.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoBanner;
