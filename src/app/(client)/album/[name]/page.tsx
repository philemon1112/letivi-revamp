import SharedAlbumDetails from "@/components/templates/SharedAlbumDetails";
import { Metadata } from "next";
import { getSharedAlbumDetails2 } from "@/services/shared";
import { getApiMedia } from "@/utils/getApiMedia";

interface ParamsType {
  params: Promise<{
    name: string;
  }>;
}

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: ParamsType): Promise<Metadata> {
  const { name } = await params;
  try {
    // Fetch album details server-side for metadata
    const albumData = await getSharedAlbumDetails2(name);
    const album = albumData?.data;

    // Get the first post's image URL if available
    const firstPostImage =
      getApiMedia(album?.posts[0]?.medias[0]?.small_thumbnail) ||
      "/assets/img/Album01.png";

    return {
      title: `${album?.name || "Photo Album"} | Letivi`,
      description: `View ${album?.name} - A collection of ${
        album?.posts?.length || 0
      } photos and videos on Letivi`,
      openGraph: {
        title: `${album?.name || "Photo Album"} | Letivi`,
        description: `View ${album?.name} - A collection of ${
          album?.posts?.length || 0
        } photos and videos on Letivi`,
        images: [
          {
            url: getApiMedia(album?.posts[0]?.medias[0]?.small_thumbnail),
            width: 1200,
            height: 630,
            alt: album?.name || "Photo Album",
          },
        ],
        type: "website",
        siteName: "Letivi",
      },
      twitter: {
        card: "summary_large_image",
        title: `${album?.name || "Photo Album"} | Letivi`,
        description: `View ${album?.name} - A collection of ${
          album?.posts?.length || 0
        } photos and videos on Letivi`,
        images: [firstPostImage],
        creator: "@letivi",
      },
      alternates: {
        canonical: `https://letivi.com/album/${name}`,
      },
    };
  } catch (error) {
    console.log("Error fetching album details:", error);
    // Fallback metadata if fetch fails
    return {
      title: "Photo Album | Letivi",
      description:
        "View photo album on Letivi - High Resolution Stock Photos and Videos",
    };
  }
}

const AlbumPage = async ({ params }: ParamsType) => {
  const { name } = await params;

  return (
    <div className="carousel hide-scrollbar h-screen fixed inset-0 bg-[#000000ef] z-[99] grid place-content-center lg:p-3 pb-24 md:pt-4">
      <div className="mx-auto w-screen max-w-screen-xl px-4 md:px-2">
        <SharedAlbumDetails albumId={name} />
      </div>
    </div>
  );
};

export default AlbumPage;
