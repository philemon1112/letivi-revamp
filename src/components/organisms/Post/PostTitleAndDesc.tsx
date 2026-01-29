import TruncatedDescription from "@/components/molecules/TruncatedDescription";
import { Post } from "@/types/nature";
import React from "react";

interface PostTitleAndDescProps {
  post: Post | any;
}

const PostTitleAndDesc = ({ post }: PostTitleAndDescProps) => {
  return (
    <>
      {/* POST TITLE */}
      {post.title === typeof undefined ? (
        ""
      ) : (
        <TruncatedDescription
          maxLength={75}
          customStyles="text-base md:text-lg font-bold mt-5"
          description={post.title}
        />
      )}
      {/* POST DESCRIPTION */}
      {post.description === typeof undefined ? (
        ""
      ) : (
        <TruncatedDescription
          customStyles="mt-4 text-sm md:text-base"
          maxLength={200}
          description={post.description}
        />
      )}
    </>
  );
};

export default PostTitleAndDesc;
