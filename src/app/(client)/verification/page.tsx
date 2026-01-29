// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Verification | Letivi",
};

async function page() {
  // const i18nextNamesSpaces = ["workspaces", "common"];

  // const { t, resources } = await initTranslations(locale, i18nextNamesSpaces);

  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nextNamesSpaces}
    // >
    <div className="">
      {/* <h1>{t('common:explore')}</h1>
        <LanguageChanger /> */}
    </div>
    // </TranslationsProvider>
  );
}

export default page;
