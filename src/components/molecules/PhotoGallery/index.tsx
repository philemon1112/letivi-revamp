import { Post } from "@/types/nature";
import { getApiMedia } from "@/utils/getApiMedia";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import EmptyMedia from "../EmptyMedia";

interface PhotoGalleryProps {
  photoPosts: Post[];
}

function PhotoGallery({ photoPosts }: PhotoGalleryProps) {
  const handleContextMenu = (e: any) => {
    e.preventDefault(); // Prevent the default context menu
  };

  const isPhotoPostsEmpty = photoPosts?.length === 0;

  return (
    <>
      <div className="columns-2 md:columns-4 gap-2 md:gap-4">
        {!isPhotoPostsEmpty &&
          photoPosts?.map((photoPost, index) => {
            // return <p>{photoPost.title}</p>;
            return (
              <div className={"relative"} key={index}>
                {/* <Link to={`${photoPost.slug}`}> removed this because we don't have to redirect user */}
                <div
                  // onClick={() => {
                  //   if (isSelectable) {
                  //     onSelect(photoPost);
                  //   } else {
                  //     setPost(photoPost);
                  //     console.log(photoPost);
                  //     setShowPostDetails(true);
                  //   }
                  // }}
                  className="w-full cursor-pointer"
                >
                  {photoPost?.medias?.map((media, index) => (
                    <LazyLoadImage
                      src={
                        media?.large_thumbnail
                          ? getApiMedia(media.small_thumbnail)
                          : getApiMedia(media.path)
                      }
                      key={index}
                      alt=""
                      loading="lazy"
                      effect="blur"
                      width={"100%"}
                      onContextMenu={handleContextMenu}
                      placeholderSrc={"/assets/Img/plain-placeholder.png"}
                      className="w-full rounded h-full"
                    />
                  ))}

                  {/* {isSelectable && (
                  <Box
                    position={"absolute"}
                    top={5}
                    right={5}
                    padding="10px"
                    borderRadius={"full"}
                    border="2px solid #fff"
                    bg={
                      selected.findIndex((el) => el.id === photoPost.id) === -1
                        ? "rgba(255, 255, 255, 0.9)"
                        : " #EE364F"
                    }
                  ></Box>
                )} */}
                </div>
              </div>
            );
          })}
      </div>

      {isPhotoPostsEmpty && <EmptyMedia isPhoto />}
    </>
  );
}

export default PhotoGallery;
