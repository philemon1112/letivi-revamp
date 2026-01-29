"use client";
import React, { useState } from "react";
import ProfileCard from "@/components/molecules/ProfileCard";
import FeedTags from "@/components/molecules/FeedTags";
import MobileProfileCard from "@/components/molecules/MobileProfileCard";
import FeedSearch from "../FeedSearch/FeedSearch";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import UploadContent from "@/components/molecules/UploadContent";

import PostList from "@/components/molecules/PostList";
import BaseTemplate from "../BaseTemplate";
import MobileGalleryCard from "@/components/molecules/mobileGalleryCard";

function Feed() {
  const currentUser = useCurrentUser();
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const triggerRefetch = () => {
    setRefetchTrigger((prev) => prev + 1);
  };

  const refetchAllPosts = () => {
    triggerRefetch();
  };
  return (
    <BaseTemplate withFooter={false}>
      <div className="feed-body">
        <div className="bg-gray-100 lg:py-26 py-24 md:pb-4 mb-2 max-w-[1920px]  mx-auto hide-scrollbar">
          <div className="flex justify-around  gap-x-10 w-screen h-screen px-2 md:px-3 text-gray-700">
            <div className="flex w-full max-w-screen-2xl mx-auto">
              {/* LOGGED IN USER PROFILE CARD */}
              <ProfileCard currentUser={currentUser} />

              {/* TAGS, UPLOAD AND FEEDS SECTION */}
              <div className="flex flex-col w-full md:mt-4 md:w-6/12 ">
                <div className="flex-grow  h-0 overflow-auto">
                  <MobileProfileCard currentUser={currentUser} />
                  <FeedTags />
                  <MobileGalleryCard />
                  <UploadContent
                    currentUser={currentUser}
                    refetchAllPosts={refetchAllPosts}
                  />

                  {/* FEEDS */}
                  <PostList refetchPost={refetchTrigger} />
                </div>
              </div>

              {/* SEARCH AND GALLERY SECTION */}
              <FeedSearch currentUser={currentUser} />
            </div>
          </div>
        </div>
      </div>
    </BaseTemplate>
  );
}

export default Feed;
