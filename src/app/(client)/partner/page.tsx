import Partner from "@/components/templates/Partner";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Partner | Letivi",
  description:
    "Become a partner with Letivi. Collaborate with us and contribute to our platform for personal stock photos and videos.",
};

async function page() {
  // const i18nextNamesSpaces = ["partner", "common"];

  // const { t, resources } = await initTranslations(locale, i18nextNamesSpaces);

  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nextNamesSpaces}
    // >
    <div className="">
      <Partner />
    </div>
    // </TranslationsProvider>
  );
}

export default page;
