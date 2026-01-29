"use client";

import { ChevronDown, Trash2, UserCircle2 } from "lucide-react";
import { FC, useState } from "react";
import { mockChatMessages } from "./assets/mock";
import ComposeMessage from "./ComposeMessage";

type MockChatType = {
  id: number;
  img: any;
  name: string;
  time: string;
  numberOfMessage: string;
  typing: boolean;
  message: string;
  status: string;
  active: boolean;
};

const ChatList: FC = () => {
  const [showDeleteButtons, setShowDeleteButtons] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleDeleteButton = (id: number) => {
    setShowDeleteButtons((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="mt-6">
      <div>
        {/* Messages */}
        {mockChatMessages.map((mes) => {
          return (
            <div key={mes.id}>
              <div className="flex gap-4 cursor-pointer hover:bg-gray-400/10 hover:rounded-md p-2 border-none group">
                {/* <hr /> */}
                <UserCircle2 className="w-10 h-10 text-gray-500 " />
                <div className="flex justify-between  flex-1">
                  <div className="flex flex-col ">
                    <h1 className="font-bold text-black tracking-tight">
                      {mes.name}
                    </h1>
                    <small className="text-gray-500">{mes.message}</small>
                  </div>
                  <div className="flex flex-col transition-all delay-200">
                    <small className="text-gray-500 ">{mes.time}</small>
                    <div className="flex  justify-between mt-1">
                      <div className="transition-all delay-200">
                        {showDeleteButtons[mes.id] && (
                          <button
                            title="delete"
                            className="rounded-md bg-slate-900/10 text-red-500 text-sm p-2 hover:bg-red-600 hover:text-white"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Delete Message Button */}
                      <ChevronDown
                        onClick={() => toggleDeleteButton(mes.id)}
                        className="text-gray-500 w-4 h-4 mt-1 text-end cursor-pointer hidden group-hover:flex group-hover:justify-evenly transition-all delay-100"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
