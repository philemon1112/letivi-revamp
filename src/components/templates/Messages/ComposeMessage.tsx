import { MessageCircleMore, Send, SendIcon, X } from "lucide-react";
import { FC, useState } from "react";
import Chats from "./UserChat";
import { Button } from "@/components/atoms/Button";

interface ComposeMessageProps {
  onClose: () => void; // Function to handle modal closing
}

const ComposeMessage: FC<ComposeMessageProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-y-scroll bg-white z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Compose Message</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>
          <hr className="my-4" />

          {/* To: Input */}
          <input
            type="text"
            name="message"
            className="w-full mb-4 p-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="To: Name or Email"
          />

          {/* Message Area */}
          <hr className="my-4" />
          {/* <Chats /> */}

          {/* Message Input */}
          <div className="mt-4">
            <textarea
              className="w-full p-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Type your message..."
              rows={3}
            ></textarea>
          </div>

          {/* Send Button */}
          <div className="mt-4 flex justify-end">
            <div>
              <Button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
                <Send className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeMessage;
