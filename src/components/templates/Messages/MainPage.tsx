"use client";

import { useState } from "react";
import { FC } from "react";
import { Ghost, MailPlus, SearchIcon } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import ChatList from "./ChatList";
import ComposeMessage from "./ComposeMessage";

interface MainPageProps {}

const MainPage: FC<MainPageProps> = () => {
  const [showMessageCompose, setShowMessageCompose] = useState(false);

  const showMessageModal = () => {
    setShowMessageCompose((prev) => !prev);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-20 lg:pt-28 sm:px-6 lg:px-8">
      <div className="mt-4 flex flex-col lg:flex-row lg:space-x-4">
        {/* ChatList */}
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h1 className="text-[#1184c1] font-bold tracking-tighter text-2xl">
              Messages
            </h1>

            {/* Compose Button */}
            <div className="flex justify-end mt-4">
              <Button
                variant="white"
                className="inline-flex items-center gap-x-2 hover:bg-blue-500/10 text-xl tracking-tight"
                onClick={() => showMessageModal()}
              >
                <MailPlus className="w-5 h-5 font-bold text-[#1184c1]" />
                <p className="text-[#1184c1]">Compose</p>
              </Button>
            </div>
          </div>
          <div className="mt-6">
            <div className="p-3 w-full inline-flex items-start border-gray-500 border-2 gap-x-2 shadow-md rounded-md focus:outline-none focus:border-blue-700 focus:border-2 group group-focus:border-none">
              <SearchIcon className="w-5 h-5 text-gray-500" />
              <input
                type="email"
                placeholder="Search"
                className="w-full focus:outline-none group-focus:border-blue-700"
              />
            </div>
          </div>
          <ChatList />
        </div>

        {/* Message Modal */}
        {showMessageCompose ? (
          <ComposeMessage onClose={() => setShowMessageCompose(false)} />
        ) : (
          <div className="hidden lg:flex flex-grow justify-center items-center text-center">
            <div className="text-gray-500 flex-col flex justify-center items-center  text-xl">
              <Ghost className="w-10 h-10" />
              <p>You Have No new active Chats</p>

              <Button variant="secondary">Start a new Chat</Button>
            </div>
          </div>
        )}
      </div>

      {/* Todo : fix this later */}

      {/* <UserChats /> */}
    </div>
  );
};

export default MainPage;
