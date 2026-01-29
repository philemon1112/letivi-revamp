import { useShare } from "@/hooks/usePost";
import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";
import { toast } from "sonner";

interface ShareProps {
  handleModal: () => void;
  header: string;
  postId?: number;
  url: string;
  text: string;
}

function Share({ handleModal, header, postId, url, text }: ShareProps) {
  //   SHARE POST
  const { mutateAsync: shareMutation } = useShare();

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    if (postId) {
      shareMutation(postId);
    }
    toast.success("Link copied");
  };
  return (
    <div>
      <div className="carousel fixed inset-0 bg-[#000000ef] z-[99] grid place-content-center p-6 ">
        <div className="rounded-2xl lg:w-[700px] w-auto  bg-white p-2 overflow-y-auto">
          <div
            onClick={handleModal}
            className="flex items-center justify-between"
          >
            <p className="font-medium">{header}</p>
            <img
              src={"/assets/Svg/cancel.svg"}
              alt=""
              className="w-6 h-6 hover:cursor-pointer"
            />
          </div>

          <div className="flex justify-center mt-4 space-x-4">
            <TelegramShareButton
              onClick={() => postId && shareMutation(postId)}
              url={url}
              //   quote={"Share"}
            >
              <img
                src={"/assets/Svg/Share/telegram.svg"}
                alt="twlegram_share_icon"
              />
            </TelegramShareButton>
            <FacebookShareButton
              onClick={() => postId && shareMutation(postId)}
              url={url}
              // quote={"Share"}
            >
              <img src={"/assets/Svg/Share/fb.svg"} alt="fb_share_icon" />
            </FacebookShareButton>
            <WhatsappShareButton
              onClick={() => postId && shareMutation(postId)}
              url={url}
              //   quote={"Share"}
            >
              <img
                src={"/assets/Svg/Share/Whatsapp.svg"}
                alt="whatsapp_share_icon"
              />
            </WhatsappShareButton>

            <TwitterShareButton
              onClick={() => postId && shareMutation(postId)}
              url={url}
              //   quote={"Share"}
            >
              <img
                src={"/assets/Svg/Share/twitter.svg"}
                alt="twitter_share_icon"
              />
            </TwitterShareButton>
            <LinkedinShareButton
              onClick={() => postId && shareMutation(postId)}
              url={url}
              //   quote={"Share"}
            >
              <img
                src={"/assets/Svg/Share/linkedin.svg"}
                alt="linkedin_share_icon"
              />
            </LinkedinShareButton>
            <EmailShareButton
              onClick={() => postId && shareMutation(postId)}
              url={url} // Ensure the url prop is passed here
              subject={"Shared Link from Letivi"}
              body={url}
              separator=" "
              openShareDialogOnClick
              //   quote={"Share"}
            >
              <img src={"/assets/Svg/Share/email.svg"} alt="email share icon" />
            </EmailShareButton>
          </div>

          <p className="my-6 text-center text-gray-500">{text}</p>

          <div className="px-10">
            <div className="p-4 px-10 mb-6 text-center text-gray-400 truncate bg-gray-100 rounded-2xl">
              {url}
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <button
              onClick={handleCopy}
              className="flex p-3 space-x-3 text-red-500 border-2 rounded-lg border-na_red"
            >
              <p>Copy Link</p> <img src={"/assets/Svg/copy.svg"} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Share;
