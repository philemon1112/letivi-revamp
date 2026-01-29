import AboutTemplate from "@/components/templates/About";
import Settings from "@/components/templates/Settings";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Letivi | Settings",
  description: "Set up your account",
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
      <Settings />
    </div>
    // </TranslationsProvider>
  );
}

export default page;
