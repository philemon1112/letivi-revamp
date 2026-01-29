import BaseTemplate from "@/components/templates/BaseTemplate";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Profile | Letivi",
  description:
    "Manage your Letivi profile. Showcase your high-resolution profile, work photos, videos, and biographies. Connect with others in the creative community.",
  openGraph: {
    title: "Profile | Letivi",
    description:
      "Manage your Letivi profile. Showcase your high-resolution profile, work photos, videos, and biographies. Connect with others in the creative community.",
    url: "https://letivi.com/profile",
  },
};

async function page() {
  // const i18nextNamesSpaces = ["feeds", "common"];

  // const { t, resources } = await initTranslations(locale, i18nextNamesSpaces);

  const menus = [
    {
      icon: "/assets/Svg/bio.svg",
      title: "Biography",
      link: "/profile/biography",
    },
    {
      icon: "/assets/Svg/gallery.svg",
      title: "Gallery",
      link: "/profile/gallery",
    },
    {
      icon: "/assets/Svg/create_workspace.svg",
      title: "My Workspaces",
      link: "/profile/workspace",
    },
  ];

  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nextNamesSpaces}
    // >
      <BaseTemplate withFooter={false}>
        <div className="bg-white">
          <div className="min-h-[101vh] flex items-center justify-center">
            <div className="flex justify-center items-end gap-0 md:gap-10">
              {menus.map((item) => (
                <Link key={item.link} href={item.link} className="block">
                  <div className="flex flex-col justify-center p-5 hover:bg-blue-50 rounded-2xl transition-colors">
                    <div className="flex justify-center">
                      <div className="relative w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[150px] lg:h-[150px]">
                        <Image
                          src={item.icon}
                          alt={item.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <p className="text-center text-sm md:text-base lg:text-2xl font-semibold py-2.5">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </BaseTemplate>
    // </TranslationsProvider>
  );
}

export default page;
