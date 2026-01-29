import { Metadata } from "next";
import { getSharedUserProfile } from "@/services/shared";
import { getApiMedia } from "@/utils/getApiMedia";
import SharedProfile from "@/components/templates/SharedProfile";

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
    // Fetch userProfile details server-side for metadata
    const userData = await getSharedUserProfile(id, null);
    const userProfile = userData?.data;

    // Get the first userProfile's image URL if available
    const firstPostImage =
      getApiMedia(userProfile?.profile?.picture) || "/assets/img/Album01.png";

    return {
      title: `${userProfile?.first_name} ${userProfile?.last_name} - ${userProfile?.profession?.profession} - ${userProfile?.profile?.country} | Letivi`,
      description: `${userProfile?.profile?.bio || ""} || "About Me | Letivi"`,
      openGraph: {
        title: `${userProfile?.first_name} ${userProfile?.last_name} - ${userProfile?.profession?.profession} - ${userProfile?.profile?.country} | Letivi`,
        description: `${
          userProfile?.profile?.bio || ""
        } || "About Me | Letivi"`,
        images: [
          {
            url: getApiMedia(userProfile?.profile?.picture),
            width: 600,
            height: 330,
            alt: `${userProfile?.first_name} ${userProfile?.last_name} - ${userProfile?.profession?.profession} - ${userProfile?.profile?.country} | Letivi`,
          },
        ],
        type: "website",
        siteName: "Letivi",
      },
      twitter: {
        card: "summary_large_image",
        title: `${userProfile?.first_name || ""} ${userProfile?.last_name || ""} - ${userProfile?.profession?.profession || ""} - ${userProfile?.profile?.country || ""} | Letivi`,
        description: `${userProfile?.profile?.bio || "About Me | Letivi"}`,
        images: [firstPostImage],
        creator: "@letivi",
      },
      alternates: {
        canonical: `https://letivi.com/lt/${id}`,
      },
    };
  } catch (error) {
    console.log("Error fetching userProfile details:", error);
    // Fallback metadata if fetch fails
    return {
      title: "User Profile | Letivi",
      description:
        "View userProfile on Letivi - High Resolution Stock Photos and Videos",
    };
  }
}

const UserProfilePage = async ({ params }: ParamsType) => {
  const resolvedParams = await params;
  const userData = await getSharedUserProfile(resolvedParams.id, null);
  const userProfile = userData?.data;

  if (!userProfile) {
    return <div className="text-white">user not found</div>;
  }

  return (
    <SharedProfile userData={userData} params={resolvedParams} />
  );
};

export default UserProfilePage;
