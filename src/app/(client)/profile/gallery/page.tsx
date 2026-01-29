import Gallery from "@/components/templates/Gallery";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile - Gallery | Letivi",
  description:
    "Browse through your Letivi profile gallery. Explore and showcase your high-resolution profile photos and videos in one place.",
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
    <Gallery />
    // </TranslationsProvider>
  );
}

export default page;
