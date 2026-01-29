import Nature from "@/components/templates/Nature";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Explore Nature | Letivi",
  description:
    "Explore stunning nature-themed personal stock photos and videos on Letivi. Discover high-resolution content capturing the beauty of nature.",
};

async function page() {
  // const i18nextNamesSpaces = ["nature", "common"];

  // const { t, resources } = await initTranslations(locale, i18nextNamesSpaces);

  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nextNamesSpaces}
    // >
    <div className="">
      <Nature />
    </div>
    // </TranslationsProvider>
  );
}

export default page;
