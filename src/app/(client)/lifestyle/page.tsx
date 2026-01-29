import Lifestyle from "@/components/templates/Lifestyle";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Explore Lifestyle | Letivi",
  description:
    "Explore lifestyle-themed personal stock photos and videos on Letivi. Discover high-resolution content showcasing various lifestyles.",
};

async function page() {
  // const i18nextNamesSpaces = ["lifestyle", "common"];

  // const { t, resources } = await initTranslations(locale, i18nextNamesSpaces);

  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nextNamesSpaces}
    // >
    <div className="">
      <Lifestyle />
    </div>
    // </TranslationsProvider>
  );
}

export default page;
