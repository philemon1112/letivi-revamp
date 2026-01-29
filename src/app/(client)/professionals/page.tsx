import Professionals from "@/components/templates/Professionals";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Professionals | Letivi",
  description:
    "Explore personal stock photos and videos featuring professionals from different fields on Letivi. Discover high-resolution content showcasing skilled experts and their work.",
};

async function page() {
  // const i18nextNamesSpaces = ["professionals", "common"];

  // const { t, resources } = await initTranslations(locale, i18nextNamesSpaces);

  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nextNamesSpaces}
    // >
    <div className="">
      <Professionals />
      {/* <h1>{t('common:explore')}</h1>
        <LanguageChanger /> */}
    </div>
    // </TranslationsProvider>
  );
}

export default page;
