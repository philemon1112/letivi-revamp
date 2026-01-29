// @ts-nocheck
import React, { useMemo, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineAttachFile } from "react-icons/md";
import ChatInputBox from "../ChatInputBox";
import OutgoingMessage from "../OutgoingMessage";
import IncomingMessage from "../IncomingMessage";
import { Contact, MessageReply, MessageResponse } from "@/types/messages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessageDetails } from "@/services/messages";
import { Response } from "@/services/axios-utils";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface MessageAreaProps {
  openChat: boolean;
  setOpenChat: (value: boolean) => void;
  selectedContact: Contact | null;
  setSelectedContact: (value: any) => void;
}

function MessageArea({
  openChat,
  setOpenChat,
  selectedContact,
  setSelectedContact,
}: MessageAreaProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const recipient_email = searchParams.get("to") || "";
  const newChat = searchParams.get("startChat") || false;
  const currentUser = useCurrentUser();
  const [receiver, setReceiver] = React.useState(recipient_email);
  const [parentId, setParentId] = React.useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch messages for selected contact
  const shouldFetchMessages = !!selectedContact && !newChat && !recipient_email;

  const {
    data: messageResponse = [],
    isLoading: messagesLoading,
    isError,
  } = useQuery({
    queryKey: ["messages", selectedContact?.id],
    queryFn: () =>
      selectedContact ? getMessageDetails({ id: selectedContact.id }) : [],
    enabled: shouldFetchMessages,
    staleTime: 1000 * 30, // 30 seconds
  });

  const handleCompose = () => {
    setOpenChat(true);

    // You can modify this email as needed
    const recipient = "someone@example.com";

    // Update URL with `to` query param (preserves pathname)
    const currentPath = window.location.pathname;
    const newUrl = `${currentPath}?to=${encodeURIComponent(recipient)}`;

    router.push(newUrl);
  };

  const closeChat = () => {
    setOpenChat(false);
    setSelectedContact(null);

    const params = new URLSearchParams(window.location.search);
    // Clean up URL parameters
    params.delete("startChat");
    params.delete("userId");
    params.delete("userName");
    params.delete("userPicture");
    params.delete("userEmail");
    params.delete("to");

    const newQuery = params.toString();
    const newUrl = newQuery
      ? `${window.location.pathname}?${newQuery}`
      : window.location.pathname;

    router.replace(newUrl);
  };

  const allMessages: MessageReply[] = useMemo(() => {
    if (!messageResponse || !selectedContact?.id) return [];

    const response = messageResponse as Response<MessageResponse>;

    if (!response?.data) return []; // ✅ Guard against undefined

    const { message, replies } = response.data;
    setParentId(message.id ?? null);
    const combined = [message, ...replies].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    return combined;
  }, [messageResponse, selectedContact?.id]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  useEffect(() => {
    isError && closeChat();
  }, [isError]);

  if (messagesLoading) {
    return (
      <div
        className={`${
          openChat ? "left-0 right-0 " : "left-[150%] "
        } message-area md:left-0 top-0 absolute bg-white overflow-hidden z-30 md:relative md:col-span-7 lg:col-span-8 h-full transition-all duration-150 ease-in-out flex items-center justify-center`}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-500">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        openChat ? "left-0 right-0 " : "left-[150%] "
      } message-area md:left-0 top-0 absolute bg-white overflow-hidden z-5 md:relative md:col-span-7  lg:col-span-8  h-full transition-all duration-150 ease-in-out`}
    >
      {recipient_email || selectedContact ? (
        <>
          {recipient_email ? (
            <div className="absolute w-full justify-between bg-white gap-2 items-center p-3 xl:px-5 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    router.back();
                  }}
                  className="md:hidden"
                >
                  <IoArrowBackOutline />
                </button>
                <input
                  type="text"
                  placeholder="To: Name or Email"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                  className="lg:text-base text-xs p-1.5 w-full rounded outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="absolute flex w-full justify-between bg-white gap-2 items-center p-3 xl:px-5 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setOpenChat(false), setSelectedContact(null);
                  }}
                  className="md:hidden"
                >
                  <IoArrowBackOutline />
                </button>

                <div>
                  <p className="text-xs">CHAT WITH</p>
                  <p className="text-na_blue font-semibold">
                    {selectedContact?.recipient?.first_name ||
                      selectedContact?.recipient_email ||
                      "N/A"}
                  </p>
                </div>
              </div>

              {/* last seen  */}
              {/* <p className="text-na_gray text-xs">LAST SEEN: 1 MIN AGO</p> */}

              {/* shared media  */}
              <div className="font-medium text-xs md:text-sm gap-1 md:gap-2 hidden">
                <span className="rotate-45 md:text-lg text-sm">
                  <MdOutlineAttachFile />
                </span>
                <span>SHARED MEDIA (2)</span>
              </div>
            </div>
          )}

          {/* ends: MESSAGE AREA HEADER  */}

          {/* MESSAGES AREA */}
          <div className="h-full flex flex-col justify-end py-16 w-full">
            {!recipient_email && (
              <div className="mt-auto py-2 px-4 space-y-2 h-[75vh] overflow-y-scroll">
                {/* incoming message */}
                {allMessages.map((message) => (
                  <React.Fragment key={message.id}>
                    {message.sender.id === currentUser?.id ? (
                      <OutgoingMessage
                        key={message.id}
                        content={message.content}
                        user={message?.sender}
                        time={message?.updated_at}
                        media={message?.media}
                      />
                    ) : (
                      <IncomingMessage
                        key={message.id}
                        content={message.content}
                        user={message?.sender}
                        time={message?.updated_at}
                        media={message?.media}
                      />
                    )}
                  </React.Fragment>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}

            <ChatInputBox
              selectedContact={selectedContact}
              parentId={parentId}
              recipient_email={receiver}
              closeChat={closeChat}
            />
          </div>
        </>
      ) : (
        <div className="flex-col flex items-center h-screen justify-center bg-white">
          <img
            src={"/assets/Svg/emptychat.svg"}
            className="object-contain h-52 w-52"
            alt="emptyChat"
          />
          <div className="text-center justify-center items-center">
            <h2 className="text-xl font-medium text-gray-700 mb-2">
              Select a conversation
            </h2>
            <p className="text-gray-500">
              Choose from your existing <br className="flex md:hidden" />{" "}
              conversations or{" "}
              <a
                onClick={handleCompose}
                className="underline text-blue-600 cursor-pointer"
              >
                start a new one
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageArea;
