import { Button } from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import PostLoadingShimmer from "@/components/atoms/PostLoading";
import PostEmptyState from "@/components/molecules/EmptyState";
import PostGalleryCard from "@/components/molecules/PostGalleryItem";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { deletePost, getAlbumsPost } from "@/services/gallery";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Link } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Post, SavedPost } from "@/types/common";

function AlbumDetails() {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const albumId = searchParams.get("id") || "";
  const [edit, setEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selected, setSelected] = useState<Post[]>([]);

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
    queryKey: ["AlbumDetails", albumId],
    queryFn: () => {
      if (currentUser?.id === undefined) {
        throw new Error("User ID is undefined");
      }
      return getAlbumsPost(albumId, currentUser.id);
    },
    select: (response) => {
      return response?.data;
    },
    refetchOnWindowFocus: false,
  });

  const handleSelected = (item: Post) => {
    const isSelected = selected.findIndex((el) => el.id == item.id);
    if (isSelected === -1) {
      setSelected([...selected, item]);
    } else {
      const newSelected = selected.filter((el) => el.id !== item.id);
      setSelected(newSelected);
    }
  };

  const removeFromAlbum = async () => {
    setIsEditing(true);
    await Promise.all(
      selected.map(async (post) => {
        await deletePost(post?.id);
      })
    );
    setIsEditing(false);
    setSelected([]);
  };

  return (
    <div className="bg-white !rounded-3xl h-screen overflow-x-auto mt-5 no-scrollbar">
      <div className="main  rounded-t-xl overflow-x-auto  px-3 md:px-6">
        <div className="flex pt-3 justify-between items-center">
          <div className="flex items-center gap-x-2">
            <Button
              onClick={() => router.back()}
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
          <div className="flex items-center gap-4">
            <Button
              variant="primary"
              size="base"
              className="flex"
              onClick={() => setEdit(!edit)}
            >
              <img
                src="/assets/Svg/edit_photo.svg"
                alt=""
                width={15}
                className="mr-2"
              />
              <p className="font-semibold tracking-wider">
                {" "}
                {edit ? "Cancel" : "Edit"}
              </p>
            </Button>
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
                  {edit && (
                    <div className="flex justify-end gap-x-4 mb-4">
                      <Button
                        variant="tertiary"
                        size="base"
                        onClick={removeFromAlbum}
                        loading={isEditing}
                      >
                        <img
                          src="/assets/Svg/trash.svg"
                          alt=""
                          width={15}
                          className="mr-2"
                        />
                        <p className="font-semibold tracking-wider">
                          Remove {selected.length > 0 && `(${selected.length})`}
                        </p>
                      </Button>
                      <Button variant="primary" size="base" className="flex">
                        <img
                          src="/assets/Svg/add_photo.svg"
                          alt=""
                          width={15}
                          className="mr-2"
                        />
                        Add Photo / Video
                      </Button>
                    </div>
                  )}
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
                          isSelectable={edit}
                          selected={selected}
                          onSelected={handleSelected}
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

export default AlbumDetails;
