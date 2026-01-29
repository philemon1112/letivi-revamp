import Workspace from "@/components/templates/Workspace";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile - Workspaces | Letivi",
  description:
    "Create and join workspaces. Create or join organisation businesses , events and project groups. Join the creative community now!",
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
    <Workspace />
    // </TranslationsProvider>
  );
}

export default page;
