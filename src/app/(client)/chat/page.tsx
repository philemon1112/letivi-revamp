import ChatApp from "@/components/templates/Chat";
import Messages from "@/components/templates/Messages";
// import initTranslations from "@/i18n";
// import TranslationsProvider from "@/utils/TranslationsProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Messages | Letivi",
  description:
    "Send and receive messages on Letivi. Stay connected with other users, collaborators, and partners through our secure messaging system.",
};

async function page() {
  // const i18nextNamesSpaces = ["messages", "common"];

  // const { t, resources } = await initTranslations(locale, i18nextNamesSpaces);

  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nextNamesSpaces}
    // >
    <div className="h-full">
      <ChatApp />
      {/* <h1>{t('common:explore')}</h1>
        <LanguageChanger /> */}
    </div>
    // </TranslationsProvider>
  );
}

export default page;
