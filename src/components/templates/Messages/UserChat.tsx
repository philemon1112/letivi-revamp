"use client";
import { FC, useState } from "react";

interface Message {
  id: number;
  content: string;
  timestamp: string;
}

const UserChats: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage: Message = {
        id: Date.now(),
        content: inputMessage,
        timestamp: new Date().toLocaleString(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg shadow-lg bg-white">
      {/* Message list */}
      <div className="flex flex-col gap-2 overflow-y-auto max-h-96">
        {messages.map((message) => (
          <div
            key={message.id}
            className="flex flex-col max-w-xs rounded-lg bg-blue-200 p-2"
          >
            {/* Message content */}
            <p className="text-sm">{message.content}</p>
            {/* Timestamp */}
            <p className="text-xs text-gray-500 self-end">
              {message.timestamp}
            </p>
            {/* Delete message button */}
            <button
              onClick={() => deleteMessage(message.id)}
              className="self-end text-xs text-red-500 hover:text-red-700 focus:outline-none"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="flex flex-col sm:flex-row">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="border rounded-md p-2 mb-2 sm:mb-0 sm:mr-2 flex-1 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default UserChats;
