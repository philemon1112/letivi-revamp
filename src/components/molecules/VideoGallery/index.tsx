import { Post } from "@/types/nature";
import { getApiMedia } from "@/utils/getApiMedia";
import React from "react";
import EmptyMedia from "../EmptyMedia";

interface VideoGalleryProps {
  videoPosts: Post[];
}

const VideoGallery = ({ videoPosts }: VideoGalleryProps) => {
  const handleContextMenu = (e: any) => {
    e.preventDefault(); // Prevent the default context menu
  };

  const isVideoPostEmpty = videoPosts?.length === 0;

  const getVideoSrc = (videoPost: Post): string => {
    const hasMedia = videoPost?.medias?.length > 0;
    const videoMedia = videoPost?.medias[videoPost?.medias.length - 1];

    return hasMedia
      ? videoMedia?.small_thumbnail
        ? getApiMedia(videoMedia?.small_thumbnail)
        : getApiMedia(videoMedia?.path)
      : "";
  };

  return (
    <>
      <div className="gallery">
        {!isVideoPostEmpty &&
          videoPosts?.map((videoPost, index) => {
            return (
              <div key={index}>
                <div
                  //   onClick={() => {
                  //     if (isSelectable) {
                  //       onSelect(videoPost);
                  //     } else {
                  //       setPost(videoPost);
                  //       setShowPostDetails(true);
                  //     }
                  //   }}
                  className="relative w-full cursor-pointer"
                >
                  <div className=" rounded-lg">
                    <video
                      src={getVideoSrc(videoPost)}
                      loop
                      // autoPlay
                      controls
                      muted
                      onContextMenu={handleContextMenu}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      // onPlay={(e) => {
                      //   dispatch(viewPost({ postId: videoPost?.id }));
                      // }}
                      controlsList="nodownload"
                      playsInline
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 8,
                        display: "block",
                        objectFit: "cover",
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        objectPosition: "50% 50%",
                      }}
                    ></video>
                  </div>

                  {/* {isSelectable && (
                            <Box
                              position={"absolute"}
                              top={5}
                              right={5}
                              padding="10px"
                              borderRadius={"full"}
                              border="2px solid #fff"
                              bg={
                                selected.findIndex(
                                  (el) => el.id === videoPost.id
                                ) === -1
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
      {isVideoPostEmpty && <EmptyMedia isVideo />}
    </>
  );
};

export default VideoGallery;
