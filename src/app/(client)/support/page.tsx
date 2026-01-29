import Support from "@/components/templates/Support";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Support | Letivi",
  description:
    "Get support and assistance from the Letivi team. We are here to help you with any issues or concerns you may have.",
};

async function page() {
  // const i18nextNamesSpaces = ["support", "common"];

  // const { t, resources } = await initTranslations(locale, i18nextNamesSpaces);

  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nextNamesSpaces}
    // >
    <div className="">
      <Support />
    </div>
    // </TranslationsProvider>
  );
}

export default page;
