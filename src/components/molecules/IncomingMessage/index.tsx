import { MessageContact, MessageMedia } from "@/types/messages";
import { FiSave } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import { getApiMedia } from "@/utils/getApiMedia";
import React, { useState } from "react";
import { formatDate } from "@/utils/common";
import TruncatedMessage from "../TruncatedChatMessage";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import SaveMediaToGallery from "../SaveToGallery";

interface IncomingMessageProps {
  content: string; // content can be a text | images | videos .. this will be changed later
  media?: MessageMedia[] | null;
  user?: MessageContact | any;
  time: string;
}

function IncomingMessage({ content, media, user, time }: IncomingMessageProps) {
  const [openModal, setOpenModal] = useState(false);
  const defaultImg = "/assets/Img/default.png";

  const handleModal = () => {
    setOpenModal(!openModal);
  };
  const formatTime = (timestamp: Date | string) => {
    const time =
      typeof timestamp === "string" ? new Date(timestamp) : timestamp;
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const currentUser = useCurrentUser();

  return (
    <div className="flex gap-2 w-fit max-w-[95%] md:max-w-[75%] lg:max-w-[60%] mr-auto">
      {/* Avatar */}
      {user?.picture ? (
        <div className="size-12 hidden md:block rounded-full overflow-hidden bg-gray-300 shrink-0">
          <img
            src={getApiMedia(user?.picture)}
            alt={"profile-img"}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="size-12 hidden md:block rounded-full overflow-hidden bg-gray-300 shrink-0">
          <img
            src={defaultImg}
            alt={"profile-img"}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* if content is a text */}

      <div className="flex flex-col gap-1  ">
        {media && media?.length > 0 ? (
          <div className="space-y-2 bg-[#1184C166] text-sm  rounded-tl-none rounded-lg p-3 ">
            {media.map((media) => (
              <div
                key={media.id}
                className="relative ml-auto h-auto w-[15rem] rounded-lg bg-gray-300 overflow-hidden"
              >
                {media.path !== "0" && (
                  <img
                    src={getApiMedia(media.path)}
                    alt="Shared image"
                    className="w-full h-full object-cover"
                  />
                )}

                {/* actions */}
                <div className="flex gap-2.5 text-white bg-gray-800 rounded-full p-2 px-3 absolute top-2 right-2">
                  <button onClick={handleModal}>
                    <FiSave />
                  </button>
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/message/files/download?path=${media?.path}&user_token=${currentUser?.user_token}`}
                    rel="noreferrer"
                    download
                  >
                    <FiDownload />
                  </a>
                </div>
              </div>
            ))}
            {content && (
              <TruncatedMessage
                customStyles="mt-2 text-sm "
                maxLength={400}
                description={content}
                buttonColor={"text-black"}
              />
            )}
          </div>
        ) : (
          <TruncatedMessage
            customStyles="mt-2 bg-[#1184C166] text-sm  rounded-tl-none rounded-lg p-3"
            maxLength={400}
            description={content}
            buttonColor={"text-blue-600"}
          />
        )}

        <div className="text-[12px] text-end flex justify-end items-center gap-2">
          <span>
            {formatDate(time)} • {formatTime(time)}
          </span>
        </div>
      </div>

      {openModal && (
        <SaveMediaToGallery
          handleModal={() => setOpenModal(!openModal)}
          open={openModal}
          refetchPosts={() => console.log("done")}
          message={media}
        />
      )}
    </div>
  );
}

export default IncomingMessage;
