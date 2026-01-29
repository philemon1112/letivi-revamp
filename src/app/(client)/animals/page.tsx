import Animals from "@/components/templates/Animals";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Explore Animals | Letivi",
  description:
    "Explore animal-themed personal stock photos and videos on Letivi. Discover high-resolution content featuring various animals from around the world.",
};

async function page() {
  // const i18nextNamesSpaces = ["animals", "common"];

  // const { t, resources } = await initTranslations(locale, i18nextNamesSpaces);

  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nextNamesSpaces}
    // >
    <div className="">
      <Animals />
    </div>
    // </TranslationsProvider>
  );
}

export default page;
