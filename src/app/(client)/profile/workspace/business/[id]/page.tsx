import BusinessDetails from "@/components/templates/Workspace/Details/business";
import React from "react";

interface ParamsType {
  params: Promise<{
    id: string;
  }>;
}
const page = async ({ params }: ParamsType) => {
  const resolvedParams = await params;
  return <BusinessDetails params={resolvedParams} />;
};

export default page;
