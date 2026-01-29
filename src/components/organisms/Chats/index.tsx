"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiEdit } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import SingleChat from "@/components/molecules/SingleChat";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMessage, getMessages } from "@/services/messages";
import { getApiMedia } from "@/utils/getApiMedia";
import { Contact } from "@/types/messages";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface ChatsProps {
  setOpenChat: (value: boolean) => void;
  setSelectedContact: (value: any) => void;
  selectedContact: Contact | null;
}

function Chats({
  setOpenChat,
  setSelectedContact,
  selectedContact,
}: ChatsProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [displayContacts, setDisplayContacts] = useState<Contact[]>([]);
  const hasHandledUrlChat = useRef(false);
  const {
    data: contacts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => getMessages({ limit: 100 }),
    select: (response) => {
      return response?.data;
    },
    staleTime: 1000 * 30, // 30 seconds
  });

  const handleCompose = () => {
    setOpenChat(true);

    // You can modify this email as needed
    const recipient = "someone@example.com";

    // Update URL with `to` query param (preserves pathname)
    const currentPath = window.location.pathname;
    const newUrl = `${currentPath}?startChat=true&to=${encodeURIComponent(
      recipient
    )}`;

    router.push(newUrl);
  };

  const handleCloseCompose = () => {
    setOpenChat(false);

    const params = new URLSearchParams(window.location.search);
    params.delete("to");
    params.delete("startChat");
    params.delete("userId");

    const newQuery = params.toString();
    const newUrl = newQuery
      ? `${window.location.pathname}?${newQuery}`
      : window.location.pathname;

    router.push(newUrl);
  };

  const handleDeleteChat = async (contactId: number) => {
    try {
      await deleteMessage(contactId ?? 0);
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setOpenChat(false);
      setSelectedContact(null);
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };
  // Handle automatic chat start from URL parameters
  // Runs once when contacts are loaded and URL has chat params
  useEffect(() => {
    if (isLoading || isError || hasHandledUrlChat.current) return;

    const startChat = searchParams.get("startChat");
    const userId = searchParams.get("userId");
    const contactId = searchParams.get("contactId");
    const userName = searchParams.get("userName");
    const userPicture = searchParams.get("userPicture");
    const userEmail = searchParams.get("userEmail");

    // No URL chat params — nothing to do
    if (!startChat) return;

    hasHandledUrlChat.current = true;

    const params = new URLSearchParams(window.location.search);

    // Handle existing chat selection (startChat=false with contactId)
    if (startChat === "false" && contactId) {
      const existingContact = contacts.find(
        (contact) => contact.id.toString() === contactId
      );

      if (existingContact) {
        setSelectedContact(existingContact);
        setOpenChat(true);

        setDisplayContacts((prevContacts) => {
          const filtered = prevContacts.filter(
            (c) => c.id !== existingContact.id
          );
          return [existingContact, ...filtered];
        });

        params.delete("startChat");
        params.delete("contactId");

        const newQuery = params.toString();
        const newUrl = newQuery
          ? `${window.location.pathname}?${newQuery}`
          : window.location.pathname;

        router.replace(newUrl);
      }
      return;
    }

    // Handle new chat creation (startChat=true with userId)
    if (startChat === "true" && userId) {
      const newContact = {
        id: parseInt(userId),
        sender: {
          id: currentUser?.id,
          first_name: currentUser?.first_name,
          last_name: currentUser?.last_name,
          gender: currentUser?.gender,
          private: currentUser?.private,
          email: currentUser?.email,
          picture: currentUser?.profile?.picture,
          profile: currentUser?.profile,
          invite_link: "",
        },
        recipient: {
          id: parseInt(userId),
          first_name: userName?.split(" ")[0] || "",
          last_name: userName?.split(" ")[1] || "",
          picture: userPicture || "",
          email: userEmail || "",
          profile: "",
          invite_link: "",
          gender: "",
          private: 0,
        },
        recipient_email: userEmail || "",
        content: "Start conversation",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setDisplayContacts((prevContacts) => [newContact, ...prevContacts]);
      setSelectedContact(newContact);
      setOpenChat(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, searchParams]);

  // Sync displayContacts with contacts when search query or contacts data changes
  useEffect(() => {
    if (!contacts) return;

    if (!searchQuery.trim()) {
      setDisplayContacts(contacts);
      return;
    }

    const query = searchQuery.toLowerCase();

    const filtered = contacts.filter((chat) => {
      const isSender = chat?.sender?.id === currentUser?.id;
      const otherUser = isSender ? chat.recipient : chat.sender;

      const fullName = `${otherUser?.first_name ?? ""} ${
        otherUser?.last_name ?? ""
      }`.toLowerCase();
      const email = otherUser?.email?.toLowerCase() ?? "";

      return (
        fullName.includes(query) ||
        email.includes(query) ||
        chat.content?.trim().includes(query?.trim())
      );
    });

    setDisplayContacts(filtered);
  }, [searchQuery, contacts, currentUser?.id]);

  return (
    <div className="chats z-10 md:col-span-5 lg:col-span-4 border-r border-r-gray-200">
      <div className="px-3">
        {/* starts: CHATS HEADER AND SEARCH BAR */}
        <div className="flex justify-between">
          <h1 className="text-na_blue text-[28px] font-semibold">Messages</h1>
          <button
            onClick={handleCompose}
            className="text-na_blue text-xl flex gap-2 items-center"
          >
            <FiEdit /> Compose
          </button>
        </div>

        {/* starts: CHAT SEARCHBAR */}
        <div className="relative mt-4 border border-gray-200 bg-white   flex rounded-lg  ">
          <span className="absolute left-3 top-[33%] text-gray-400">
            <BsSearch />
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="px-10 bg-transparent flex-1 w-full p-3 outline-none"
          />
          {/* ends: CHAT SEARCHBAR */}
        </div>
        {/* ends: CHATS HEADER AND SEARCH BAR*/}
      </div>

      {/* start: CHATS LIST */}
      <div className="mt-2 px-1 pb-[3rem] md:pb-[1rem] w-full h-[75vh] overflow-y-scroll">
        {/* if loading then we want to show a loading spinner else we show the chats */}
        {isLoading ? (
          <div>
            <div className="w-full md:h-[90px] py-2.5 my-0.5 h-[80px] break-inside-avoid mb-4 relative group animate-pulse justify-center bg-gray-200 rounded-xl animate-gradient-x"></div>
            <div className="w-full md:h-[90px] py-2.5 my-0.5 h-[80px] break-inside-avoid mb-4 relative group animate-pulse justify-center bg-gray-200 rounded-xl animate-gradient-x"></div>
            <div className="w-full md:h-[90px] py-2.5 my-0.5 h-[80px] break-inside-avoid mb-4 relative group animate-pulse justify-center bg-gray-200 rounded-xl animate-gradient-x"></div>
            <div className="w-full md:h-[90px] py-2.5 my-0.5 h-[80px] break-inside-avoid mb-4 relative group animate-pulse justify-center bg-gray-200 rounded-xl animate-gradient-x"></div>
            <div className="w-full md:h-[90px] py-2.5 my-0.5 h-[80px] break-inside-avoid mb-4 relative group animate-pulse justify-center bg-gray-200 rounded-xl animate-gradient-x"></div>
          </div>
        ) : displayContacts.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            {searchQuery.length > 0 ? (
              <div className="text-center">
                <p>No results found</p>
              </div>
            ) : (
              <div className="text-center">
                <p>No conversations yet</p>
                <p className="text-sm mt-2">
                  Start a conversation by messaging someone!
                </p>
              </div>
            )}
          </div>
        ) : (
          displayContacts.map((chat, index) => (
            <SingleChat
              key={index}
              username={
                chat?.sender?.id === currentUser?.id
                  ? chat?.recipient?.first_name
                    ? `${chat?.recipient?.first_name} ${chat?.recipient?.last_name}`
                    : `${chat?.recipient_email}`
                  : `${chat?.sender?.first_name} ${chat?.sender?.last_name}`
              }
              avatar={
                chat?.sender?.id === currentUser?.id
                  ? chat?.recipient?.picture
                    ? getApiMedia(chat?.recipient?.picture ?? "")
                    : "/assets/Img/default.png"
                  : chat?.sender?.picture
                  ? getApiMedia(chat?.sender?.picture ?? "")
                  : "/assets/Img/default.png"
              }
              message={chat.content || ""}
              timeStamp={chat.updated_at}
              onClick={() => {
                setOpenChat(true);
                setSelectedContact(chat);
                handleCloseCompose();
              }}
              onDelete={() => handleDeleteChat(chat.id)}
              // isPinned={true}
              selected={selectedContact?.id === chat.id}
              highlightText={searchQuery}
            />
          ))
        )}
      </div>
      {/* ends: CHATS LIST */}
    </div>
  );
}

export default Chats;
