import { Metadata } from "next";
import { getSharedPost2 } from "@/services/shared";
import { getApiMedia } from "@/utils/getApiMedia";
import SharedPostDetails from "@/components/templates/SharedPostDetails";

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
    // Fetch post details server-side for metadata
    const postData = await getSharedPost2(id);
    const post = postData?.data;

    // Get the first post's image URL if available
    const firstPostImage = post?.medias?.[0]?.file_view
      ? getApiMedia(post.medias[0].file_view)
      : post?.medias?.[0]?.small_thumbnail
      ? getApiMedia(post.medias[0].small_thumbnail)
      : "/assets/img/Album01.png";

    return {
      title: `${post?.title || "Post"} | Letivi`,
      description: `${post?.description}`,
      openGraph: {
        title: `${post?.title || "Post"} | Letivi`,
        description: `${post?.description}`,
        images: [
          {
            url: post?.medias[0]?.file_view
              ? getApiMedia(post.medias[0].file_view)
              : post?.medias[0]?.small_thumbnail
              ? getApiMedia(post.medias[0].small_thumbnail)
              : "/assets/Img/letiviAlbum.png",
            width: 1200,
            height: 630,
            alt: post?.title || "User Posts",
          },
        ],
        type: "website",
        siteName: "Letivi",
      },
      twitter: {
        card: "summary_large_image",
        title: `${post?.title || "Post"} | Letivi`,
        description: `${post?.description}`,
        images: [firstPostImage],
        creator: "@letivi",
      },
      alternates: {
        canonical: `https://letivi.com/pt/${id}`,
      },
    };
  } catch (error) {
    console.log("Error fetching post details:", error);
    // Fallback metadata if fetch fails
    return {
      title: "Post | Letivi",
      description:
        "View post on Letivi - High Resolution Stock Photos and Videos",
    };
  }
}

const PostDetailsPage = async ({ params }: ParamsType) => {
  const { id } = await params;
  const postData = await getSharedPost2(id);
  const post = postData?.data;

  if (!post) {
    return <div className="text-white">Post not found</div>;
  }

  return (
    <div className="carousel hide-scrollbar h-screen fixed inset-0 bg-[#000000ef] z-[99] grid place-content-center lg:p-3 pb-24 md:pt-4">
      <div className="mx-auto w-screen max-w-screen-xl px-4 md:px-2 text-white">
        <SharedPostDetails post={post} />
      </div>
    </div>
  );
};

export default PostDetailsPage;
