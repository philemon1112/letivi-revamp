import TermsAndConditions from "@/components/templates/TermsAndConditions";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Terms and Conditions | Letivi",
  description:
    "Review the Terms and Conditions of Letivi. These terms govern your use of our platform for personal stock photos and videos.",
};

async function page() {
  // const i18nextNamesSpaces = ["terms-and-conditions", "common"];

  // const { t, resources } = await initTranslations(locale, i18nextNamesSpaces);

  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nextNamesSpaces}
    // >
    <div className="">
      <TermsAndConditions />
    </div>
    // </TranslationsProvider>
  );
}

export default page;
