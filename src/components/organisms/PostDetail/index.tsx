import React from "react";
import SinglePost from "@/components/organisms/Post";
import { Post } from "@/types/nature";
import { Professional } from "@/types/common/professional";

interface PostDetailProps {
  post: Post;
  currentUser: Professional | undefined;
  handleModal: (value: boolean) => void;
}

function PostDetail({ post, currentUser, handleModal }: PostDetailProps) {
  return (
    <div className="carousel hide-scrollbar fixed inset-0 backdrop-blur-sm backdrop-filter backdrop-brightness-50 z-[99] grid place-content-center lg:p-3 pb-24 md:pt-4  ">
      <div className=" lg:w-[700px] w-auto bg-white rounded-2xl overflow-y-auto no-scrollbar">
        <div className="p-1 ">
          <div className="flex justify-end">
            <button onClick={() => handleModal(false)}>
              <img src={"/assets/Svg/cancel.svg"} alt="" className="w-8 h-8 " />
            </button>
          </div>

          {/* POST */}
          <SinglePost
            currentUser={currentUser}
            post={post}
            isPostDetail={true}
          />
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
