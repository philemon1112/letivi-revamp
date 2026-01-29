import Workspaces from "@/components/templates/Workspaces";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Workspace | Letivi",
  description:
    "Access your Letivi workspace. Organize and manage your high-resolution work photos, videos, and related content.",
};

async function page() {
  // const i18nextNamesSpaces = ["workspaces", "common"];

  // const { t, resources } = await initTranslations(locale, i18nextNamesSpaces);

  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nextNamesSpaces}
    // >
    <div className="">
      <Workspaces />
    </div>
    // </TranslationsProvider>
  );
}

export default page;
