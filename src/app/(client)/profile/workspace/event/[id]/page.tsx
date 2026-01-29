import EventDetails from "@/components/templates/Workspace/Details/event";
import React from "react";

interface ParamsType {
  params: Promise<{
    id: string;
  }>;
}
const page = async ({ params }: ParamsType) => {
  const resolvedParams = await params;
  return <EventDetails params={resolvedParams} />;
};

export default page;
