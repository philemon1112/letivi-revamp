import Biography from "@/components/templates/Biography";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile - Biography | Letivi",
  description:
    "Craft and manage your Letivi profile biography. Tell your story and showcase your journey in the creative world with a high-resolution biography.",
};

async function page() {
  // const i18nextNamesSpaces = ["feeds", "common"];

  // const { t, resources } = await initTranslations(locale, i18nextNamesSpaces);

  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nextNamesSpaces}
    // >
    <Biography />
    // </TranslationsProvider>
  );
}

export default page;
