import { Metadata } from "next";
import { getSharedBusinessProfile } from "@/services/shared";
import { getApiMedia } from "@/utils/getApiMedia";
import SharedBusinessDetails from "@/components/templates/SharedBusiness";

interface ParamsType {
  params: Promise<{
    id: string;
  }>;
}

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: ParamsType): Promise<Metadata> {
  const { id } = await params;
  try {
    // Fetch business details server-side for metadata
    const businessData = await getSharedBusinessProfile(id);
    const business = businessData?.data;

    // Get the first business's image URL if available
    const firstbusinessImage =
      getApiMedia(business?.business_profile?.logo) ||
      "/assets/img/Album01.png";

    return {
      title: `${business?.name || "organisation"} | Letivi`,
      description: `${business?.description || ""}`,
      openGraph: {
        title: `${business?.name || "organsation"} | Letivi`,
        description: `${business?.description || ""}`,
        images: [
          {
            url: getApiMedia(business?.business_profile?.logo),
            width: 1200,
            height: 630,
            alt: business?.name || "User Organisations",
          },
        ],
        type: "website",
        siteName: "Letivi",
      },
      twitter: {
        card: "summary_large_image",
        title: `${business?.name || "organisation"} | Letivi`,
        description: `${business?.description || ""}`,
        images: [firstbusinessImage],
        creator: "@letivi",
      },
      alternates: {
        canonical: `${business.profile}`,
      },
    };
  } catch (error) {
    console.log("Error fetching organisation details:", error);
    // Fallback metadata if fetch fails
    return {
      title: `Organisation | Letivi`,
      description:
        "View Organsations on Letivi - High Resolution Stock Photos and Videos",
    };
  }
}

const BusinessDetailsPage = async ({ params }: ParamsType) => {
  const { id } = await params;
  const businessData = await getSharedBusinessProfile(id);

  if (!businessData) {
    return <div className="text-black">Organisation not found</div>;
  }

  return (
    <SharedBusinessDetails name={id} />
  );
};

export default BusinessDetailsPage;
