import AboutTemplate from "@/components/templates/About";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About Letivi - High Resolution Stock Photos and Videos",
  description:
    "Learn about Letivi, a platform for personal stock photos and videos covering people, nature, lifestyle, culture and animals. Discover the best royalty-free high-quality content for your projects.",
};

async function page() {
  // const i18nextNamesSpaces = ["about", "common"];

  // const { t, resources } = await initTranslations(locale, i18nextNamesSpaces);

  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nextNamesSpaces}
    // >
    <div className="">
      <AboutTemplate />
    </div>
    // </TranslationsProvider>
  );
}

export default page;
