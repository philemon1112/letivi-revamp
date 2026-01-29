"use client";
import { Button } from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import PostLoadingShimmer from "@/components/atoms/PostLoading";
import PostEmptyState from "@/components/molecules/EmptyState";
import PostGalleryCard from "@/components/molecules/PostGalleryItem";

import { getSharedAlbumDetails } from "@/services/gallery";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Post } from "@/types/common";

function SharedAlbumDetails({ albumId }: { albumId: string }) {
  const router = useRouter();

  const handleVideoHover = (video: HTMLVideoElement) => {
    video.muted = true; // Must be muted for autoplay to work on most browsers
    video.play().catch(() => {
      // Handle any autoplay errors silently
    });
  };

  const handleVideoLeave = (video: HTMLVideoElement) => {
    video.pause();
    video.currentTime = 0;
  };

  const {
    data: albumDetails,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["SharedAlbumDetails", albumId],
    queryFn: () => {
      return getSharedAlbumDetails(albumId);
    },
    select: (response) => {
      return response?.data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="bg-white !rounded-3xl overflow-x-auto mt-5 no-scrollbar">
      <div className="main  rounded-t-xl overflow-x-auto  px-3 md:px-6">
        <div className="flex pt-3 justify-between items-center">
          <div className="flex items-center gap-x-2">
            <Button
              onClick={() => router.push("/")}
              variant="info"
              className="bg-gray-200"
              size="sm"
            >
              <ChevronLeft className="w-5 h-5 text-black" />
            </Button>
            <Typography weight={600} className="line-clamp-1">
              {albumDetails?.name}
            </Typography>
          </div>
        </div>
        <div className="main flex justify-center my-2 rounded-t-xl  gap-4">
          <div className="py-4 md:py-8">
            <div>
              {isLoading ? (
                <div className="columns-2 sm:columns-2 lg:columns-3 gap-4">
                  <PostLoadingShimmer />
                </div>
              ) : (
                <>
                  {albumDetails?.posts?.length ?? 0 > 0 ? (
                    <div className="columns-2 sm:columns-2 lg:columns-3 gap-4">
                      {albumDetails?.posts?.map((post: Post, index) => (
                        <PostGalleryCard
                          key={post.id}
                          post={post}
                          index={index}
                          onVideoHover={handleVideoHover}
                          onVideoLeave={handleVideoLeave}
                          allPosts={albumDetails?.posts}
                        />
                      ))}
                    </div>
                  ) : (
                    <PostEmptyState title="No Post for this Album" />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharedAlbumDetails;
