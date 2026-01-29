"use client";
import React, { useEffect, useRef, useState } from "react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { commentOnPost, getPostComments } from "@/services/posts";
import { CommentType } from "@/types/comment";
import Loader from "@/components/atoms/Loader";
import SingleComment from "./SingleComment";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getApiMedia } from "@/utils/getApiMedia";

interface CommentCompProps {
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
  postId: number;
  type?: string;
  // newComment: string;
  // setNewComment: React.Dispatch<React.SetStateAction<string>>;
}

const CommentComp = ({
  setCommentCount,
  postId,
  type = "post",
}: CommentCompProps) => {
  // setCommentCount((prev) => postComments?.length);

  // const [newComment, setNewComment] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentUser = useCurrentUser();
  const picture = currentUser?.profile?.picture;

  // FETCH POST COMMENTS
  const {
    data: postComments,
    isError,
    error,
    isLoading,
    refetch: fetchPostComments,
    isRefetching,
  } = useQuery({
    queryKey: ["postComments"],
    queryFn: () => getPostComments(postId),
    select: (data) => data.data as unknown as CommentType[],
    enabled: false,
  });

  console.log(`Post ${postId} comments: `, postComments);

  // COMMENT ON POST
  const { mutateAsync: commentOnPostMutation, isPending: sendCommentLoading } =
    useMutation({
      mutationFn: (commentData: {
        postId: number;
        newComment: string | undefined;
      }) => commentOnPost(commentData),
      onSuccess: () => {
        fetchPostComments();
        // clear text arae input field after sending comment
        if (textareaRef.current !== null && textareaRef.current !== undefined) {
          textareaRef.current.value = "";
        }
      },
    });

  // SEND COMMENT
  const sendComment = () => {
    commentOnPostMutation({ postId, newComment: textareaRef.current?.value });
  };

  useEffect(() => {
    fetchPostComments(); // Refetch the post comments each time post id changes
  }, [postId]);

  return (
    <div className="w-full">
      <div
        className={`${
          type === "sidebar" && "h-[100vh]"
        } flex flex-col justify-between`}
      >
        <div className="space-y-4">
          {isLoading || isRefetching ? (
            <div className="my-5">
              <Loader />
            </div>
          ) : postComments && postComments.length > 0 ? (
            postComments?.map((comment, id) => {
              return <SingleComment comment={comment} key={id} />;
            })
          ) : isError ? (
            <div className="flex flex-col items-center justify-center my-6">
              <p className="mb-2 font-bold text-red-600">{error?.message}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center my-6">
              <p className="mb-2 font-bold text-gray-600">No comment yet.</p>
              <p>Be the first to comment.</p>
            </div>
          )}
        </div>
        <div
          className={` bg-[#E5E6EBC7] gray-400 ${
            type === "sidebar" && "mb-3"
          }  mt-5 mx-2 rounded-lg p-1 px-2 flex items-center gap-3`}
        >
          {picture ? (
            <img
              src={getApiMedia(currentUser?.profile?.picture)}
              className="w-10 h-10 bg-cover rounded-lg "
              alt=""
            />
          ) : (
            <div className="flex items-center justify-center w-10 h-10 text-xl font-bold border border-blue-500 rounded-lg">
              {currentUser?.first_name.charAt(0).toUpperCase()}
            </div>
          )}
          <textarea
            name=""
            id=""
            rows={1}
            ref={textareaRef}
            // value={newComment}
            // onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 w-full p-3 bg-transparent border outline-none"
            placeholder="Comment...."
          ></textarea>
          <button onClick={sendComment} className="p-2 bg-black rounded-lg">
            {sendCommentLoading ? (
              <Loader />
            ) : (
              <img src={"/assets/Svg/send.svg"} alt="" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentComp;
