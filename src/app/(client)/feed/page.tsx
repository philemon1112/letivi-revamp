import Feed from "@/components/templates/Feed";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://letivi.com"),
  manifest: "/manifest.json",
  title: "Feed | Letivi",
  description:
    "Explore the Letivi feed and discover the latest content from creators around the world. Stay updated with high-resolution photos, videos, and more.",
  openGraph: {
    title: "Feed | Letivi",
    description:
      "Explore the Letivi feed and discover the latest content from creators around the world. Stay updated with high-resolution photos, videos, and more.",
    images: [
      {
        url: "https://staging.letivi.com/assets/Img/letiviThumbnail.png",
        width: 1200,
        height: 630,
        alt: "Letivi preview",
      },
    ],
    type: "website",
    siteName: "Letivi",
    locale: "en-US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feed | Letivi",
    description:
      "Explore the Letivi feed and discover the latest content from creators around the world. Stay updated with high-resolution photos, videos, and more.",
    images: ["https://staging.letivi.com/assets/Img/letiviThumbnail.png"],
  },
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
    <div className="">
      <Feed />
    </div>
    // </TranslationsProvider>
  );
}

export default page;
