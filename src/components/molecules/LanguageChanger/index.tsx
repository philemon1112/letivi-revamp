// @ts-nocheck
"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
// import { useTranslation } from "react-i18next";
// import i18nConfig from "../../../../i18nConfig";

export default function LanguageChanger() {
  // const { i18n } = useTranslation();
  // const currentLocale = i18n.language;
  const router = useRouter();
  // const currentPathname = usePathname();

  const handleChange = (e: any) => {
    const newLocale = e.target.value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    // if (
    //   currentLocale === i18nConfig.defaultLocale &&
    //   !i18nConfig?.prefixDefault
    // ) {
    //   router.push("/" + newLocale + currentPathname);
    // } else {
    //   router.push(
    //     currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
    //   );
    // }

    router.refresh();
  };

  return (
    <div className="bg-[#F5F5F5] mt-2 p-2 rounded-lg flex gap-2 items-center">
      <select
        name="internationalization"
        onChange={handleChange}
        id="language"
        value={currentLocale}
        className="bg-transparent py-0.5 outline-none w-full px-4 text-xs"
      >
        <option value="en">English</option>
        <option value="af">Afrikaans</option>
        <option value="ar">Arabic</option>
        <option value="fr">French</option>
        <option value="de">German </option>
        <option value="pt">Portuguese</option>
        <option value="es">Spanish</option>
        <option value="sw">Swahili</option>
      </select>
    </div>
  );
}
