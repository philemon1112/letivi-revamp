import Career from "@/components/templates/Career";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Careers at Letivi - Join Our Team",
  description:
    "Explore job opportunities at Letivi and join our team of creative professionals dedicated to creating the best stock photos and videos on the web.",
};

async function page() {
  // { params: { locale } }: any
  // const i18nextNamesSpaces = ["career", "common"];

  // const { t, resources } = await initTranslations(locale, i18nextNamesSpaces);

  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nextNamesSpaces}
    // >
    <div className="">
      <Career />
      {/* <h1>{t('common:explore')}</h1>
        <LanguageChanger /> */}
    </div>
    // </TranslationsProvider>
  );
}

export default page;
