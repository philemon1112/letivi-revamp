"use client";
import Chats from "@/components/organisms/Chats";
import Header from "@/components/organisms/Layout/Header";
import React, { useState, useEffect } from "react";
import MessageArea from "../../molecules/MessageArea";
import { Contact } from "@/types/messages";

function Messages() {
  const [openChat, setOpenChat] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on client side before checking mobile
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [isClient]);

  useEffect(() => {
    console.log(
      "selectedContact changed:",
      selectedContact?.id,
      "isMobile:",
      isMobile
    );
    if (selectedContact && isMobile) {
      setOpenChat(true);
    }
  }, [selectedContact, isMobile]);

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return <div>Loading...</div>;
  }

  const showChatsOnly = isMobile && !openChat;
  const showMessageOnly = isMobile && openChat;
  const showBoth = !isMobile;

  return (
    <>
      <Header />
      <div className="bg-gray-100 h-full lg:px-4 lg:py-26 main max-w-[1920px] mb-2 md:overflow-y-auto md:pb-4 mx-auto no-scrollbar overflow-hidden overflow-y-auto py-24">
        <div className="relative md:grid md:grid-cols-12 h-full md:h-auto ">
          {(showChatsOnly || showBoth) && (
            <Chats
              setOpenChat={setOpenChat}
              setSelectedContact={setSelectedContact}
              selectedContact={selectedContact}
            />
          )}
          {(showMessageOnly || showBoth) && (
            <MessageArea
              setOpenChat={setOpenChat}
              openChat={openChat}
              setSelectedContact={setSelectedContact}
              selectedContact={selectedContact}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Messages;
