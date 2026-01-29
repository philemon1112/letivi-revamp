import Faqs from "@/components/templates/Faqs";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "FAQs | Letivi",
  description:
    "Find answers to frequently asked questions about Letivi - the platform that offers personal stock photos and videos for download.",
};

async function page() {
  // const i18nextNamesSpaces = ["faqs", "common"];

  // const { t, resources } = await initTranslations(locale, i18nextNamesSpaces);

  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nextNamesSpaces}
    // >
    <div className="">
      <Faqs />
    </div>
    // </TranslationsProvider>
  );
}

export default page;
