import PrivacyPolicy from "@/components/templates/PrivacyPolicy";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Privacy Policy | Letivi",
  description:
    "Read our Privacy Policy to understand how Letivi collects, uses, and protects your personal information.",
};

async function page() {
  // const i18nextNamesSpaces = ["privacy-policy", "common"];

  // const { t, resources } = await initTranslations(locale, i18nextNamesSpaces);

  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nextNamesSpaces}
    // >
    <div className="">
      <PrivacyPolicy />
    </div>
    // </TranslationsProvider>
  );
}

export default page;
