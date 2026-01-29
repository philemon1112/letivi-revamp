import { formatDate } from "@/utils/common";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Pin, Trash2 } from "lucide-react";

interface SingleChatProps {
  username: string;
  message: string;
  timeStamp: string;
  avatar: string | null;
  selected: boolean;
  onClick: () => void;
  onDelete?: () => void;
  onPin?: () => void;
  isPinned?: boolean;
  highlightText?: string;
}

function SingleChat({
  username,
  message,
  timeStamp,
  avatar,
  selected,
  onClick,
  onDelete,
  onPin,
  isPinned = false,
  highlightText,
}: SingleChatProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const highlightMatch = (text: string, keyword: string) => {
    if (!keyword) return text;

    const regex = new RegExp(`(${keyword})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 rounded px-1">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the chat selection
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation(); // Prevent triggering the chat selection
    action();
    setShowDropdown(false);
  };

  return (
    <div className="relative my-1">
      <div
        onClick={onClick}
        className={`py-2.5 border-b border-gray-200 rounded-xl flex items-center gap-3 w-full hover:bg-white cursor-pointer px-2 transition-all duration-150 ease-in-out ${
          selected ? "bg-white border-gray-200" : ""
        }`}
      >
        {/* starts: AVATAR */}
        {avatar ? (
          <div className="size-14 rounded-full bg-gray-400 shrink-0 overflow-hidden">
            <img
              src={avatar}
              alt={username}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="size-14 bg-gray-300 rounded-full flex items-center justify-center text-xl">
            {username[0]?.toUpperCase()}
          </div>
        )}
        {/* ends: AVATAR */}

        {/* starts: USERNAME AND MESSAGE */}
        <div className="flex-1">
          <div className="flex justify-between items-center gap-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold truncate w-48">
                {" "}
                {highlightText
                  ? highlightMatch(username, highlightText)
                  : username}
              </h4>
              {isPinned && (
                <Pin className="w-3 h-3 text-blue-500 fill-blue-500" />
              )}
            </div>

            <p className="text-sm shrink-0">
              {formatDate(timeStamp, { relative: true })}
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-sm truncate w-60 md:w-80">
              {" "}
              {highlightText ? highlightMatch(message, highlightText) : message}
            </p>
            {/* Dropdown trigger - only show when chat is selected */}
            {selected && (
              <button
                onClick={handleDropdownToggle}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-150"
                aria-label="Chat options"
              >
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>
        </div>
        {/* ends: USERNAME AND MESSAGE */}
      </div>

      {/* Dropdown Menu */}
      {selected && showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-2 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1"
        >
          {onPin && (
            <button
              onClick={(e) => handleOptionClick(e, onPin)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors duration-150"
            >
              <Pin className="w-4 h-4" />
              {isPinned ? "Unpin Chat" : "Pin Chat"}
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => handleOptionClick(e, onDelete)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2 transition-colors duration-150"
            >
              <Trash2 className="w-4 h-4" />
              Delete Chat
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default SingleChat;
