import Culture from "@/components/templates/Culture";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Explore Culture | Letivi",
  description:
    "Explore cultural-themed personal stock photos and videos on Letivi. Discover high-resolution content celebrating different cultures around the world.",
};

async function page() {
  // const i18nextNamesSpaces = ["culture", "common"];

  // const { t, resources } = await initTranslations(locale, i18nextNamesSpaces);

  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nextNamesSpaces}
    // >
    <div className="">
      <Culture />
      {/* <h1>{t('common:explore')}</h1>
        <LanguageChanger /> */}
    </div>
    // </TranslationsProvider>
  );
}

export default page;
