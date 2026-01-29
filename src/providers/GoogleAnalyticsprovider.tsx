// app/providers/GoogleAnalyticsProvider.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ReactGA from "react-ga4";

const TRACKING_ID = `${process.env.NEXT_PUBLIC_ANALYTICS_ID}`; // replace with your GA4 ID

export const GoogleAnalyticsProvider = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
  }, []);

  useEffect(() => {
    const pagePath = pathname + searchParams.toString();
    ReactGA.send({ hitType: "pageview", page: pagePath });
  }, [pathname, searchParams]);

  return null; // this component only tracks and renders nothing
};
