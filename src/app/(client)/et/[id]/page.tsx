import { Metadata } from "next";
import { getSharedEventProfile } from "@/services/shared";
import { getApiMedia } from "@/utils/getApiMedia";
import SharedEventDetails from "@/components/templates/SharedEvent";

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
    // Fetch event details server-side for metadata
    const eventData = await getSharedEventProfile(id);
    const event = eventData?.data;

    // Get the first event's image URL if available
    const firstEventImage =
      getApiMedia(event?.event_profile?.logo) || "/assets/img/Album01.png";

    return {
      title: `${event?.name || "Event"} | Letivi`,
      description: `${event?.description || ""}`,
      openGraph: {
        title: `${event?.name || "Event"} | Letivi`,
        description: `${event?.description || ""}`,
        images: [
          {
            url: getApiMedia(event?.event_profile?.logo),
            width: 1200,
            height: 630,
            alt: event?.name || "User Event",
          },
        ],
        type: "website",
        siteName: "Letivi",
      },
      twitter: {
        card: "summary_large_image",
        title: `${event?.name || "Event"} | Letivi`,
        description: `${event?.description || ""}`,
        images: [firstEventImage],
        creator: "@letivi",
      },
      alternates: {
        canonical: `${event.profile}`,
      },
    };
  } catch (error) {
    console.log("Error fetching event details:", error);
    // Fallback metadata if fetch fails
    return {
      title: `Event| Letivi`,
      description:
        "View Event on Letivi - High Resolution Stock Photos and Videos",
    };
  }
}

const EventDetailsPage = async ({ params }: ParamsType) => {
  const { id } = await params;
  const eventData = await getSharedEventProfile(id);

  if (!eventData) {
    return <div className="text-black">Event not found</div>;
  }

  return (
      <SharedEventDetails name={id} />
  );
};

export default EventDetailsPage;
