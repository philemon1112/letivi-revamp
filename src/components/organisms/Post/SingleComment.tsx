import { CommentType } from "@/types/comment";
import { getApiMedia } from "@/utils/getApiMedia";
import moment from "moment";
import React from "react";

interface SingleCommentProps {
  comment: CommentType;
}

const SingleComment = ({ comment }: SingleCommentProps) => {
  const dateFormattter = (time: string | undefined) => {
    return moment(time).startOf("second").fromNow();
  };
  return (
    <div className="text-xs lg:text-base flex items-start bg-[#66666621] rounded-lg mx-2 my-2 p-2">
      <div className="w-16">
        {comment?.user?.picture ? (
          <img
            src={getApiMedia(comment?.user?.picture)}
            className="object-cover w-10 h-10 rounded-lg"
            alt="profile-image"
          />
        ) : (
          <div className="flex items-center justify-center w-10 h-10 text-xl font-bold border border-blue-500 rounded-lg">
            {comment?.user?.first_name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between space-x-12">
          <div className="font-bold">
            {comment?.user?.first_name} {comment?.user?.last_name}
          </div>
          <div>{dateFormattter(comment?.created_at)}</div>
        </div>
        <div className="mt-4 text-na_gray">{comment?.comment}</div>
      </div>
    </div>
  );
};

export default SingleComment;
