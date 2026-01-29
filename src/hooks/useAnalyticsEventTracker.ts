// hooks/useAnalyticsEventTracker.ts

// usage

// "use client";

// import useAnalyticsEventTracker from "@/hooks/useAnalyticsEventTracker";

// const Button = () => {
//   const gaEventTracker = useAnalyticsEventTracker("Promo Button");

//   return (
//     <button onClick={() => gaEventTracker("click", "promo banner top")}>
//       Click Me
//     </button>
//   );
// };

import ReactGA from "react-ga4";

const useAnalyticsEventTracker = (category = "stock image") => {
  const eventTracker = (action = "click action", label = "explore all") => {
    ReactGA.event({
      category,
      action,
      label,
    });
  };

  return eventTracker;
};

export default useAnalyticsEventTracker;
