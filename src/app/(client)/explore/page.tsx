import ExplorePageContent from "@/components/templates/Explore";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Explore | Letivi",
  description:
    "Explore a world of personal stock photos and videos on Letivi. Discover content covering people, nature, lifestyle, culture, and animals.",
};

async function page() {
  return (
    <div>
      <ExplorePageContent />
    </div>
  );
}

export default page;
