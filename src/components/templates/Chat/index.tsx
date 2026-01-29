// @ts-nocheck
"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import {
  Send,
  Image,
  Phone,
  Video,
  MoreVertical,
  Search,
  DeleteIcon,
  TrashIcon,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteMessage,
  getMessageDetails,
  getMessages,
  sendMessageToUser,
} from "@/services/messages";
import { Contact, MessageReply } from "@/types/messages";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getApiMedia } from "@/utils/getApiMedia";
import { toast } from "sonner";

// interface Contact {
//   id: string;
//   name: string;
//   avatar: string;
//   lastMessage: string;
//   timestamp: string;
//   unread: number;
//   online: boolean;
// }

interface Message {
  id: number;
  senderId: string;
  content: string;
  timestamp: Date;
  type: "text" | "image";
}

// Mock Socket.IO functionality
const mockSocket = {
  emit: (event: string, data: any) => console.log("Emitting:", event, data),
  on: (event: string, callback: (data: Message) => void) => {
    if (event === "receive-message") {
      setTimeout(() => {
        callback({
          id: Date.now(),
          senderId: "user2",
          content: "Hey! How are you doing?",
          timestamp: new Date(),
          type: "text",
        });
      }, 2000);
    }
  },
  off: (event: string) => console.log("Removing listener:", event),
};

export default function ChatApp() {
  const currentUser = useCurrentUser();
  const [localContacts, setLocalContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [parentId, setParentId] = useState<number | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // const loadContacts = async () => {
  //   try {
  //     const contactsData = await api.getContacts();
  //     setContacts(contactsData);
  //   } catch (error) {
  //     console.error("Failed to load contacts:", error);
  //   }
  // };

  const imageValidator = (
    file: File
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");

      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };

      img.onerror = reject;

      const url = URL.createObjectURL(file);
      img.src = url;
    });
  };

  // Video validation utility using HTML5 video element
  const videoValidator = (file: File) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        resolve({
          width: video.videoWidth,
          height: video.videoHeight,
          duration: video.duration,
        });
        URL.revokeObjectURL(video.src);
      };

      video.onerror = reject;
      video.src = URL.createObjectURL(file);
    });
  };

  const onChangeImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return setError(true);

    const validFiles: File[] = [];
    const maxSize = 30 * 1024 * 1024; // 30MB
    const minDimension = 500;

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error("Unsupported file type");
        continue;
      }

      if (file.size > maxSize) {
        toast.error("Image size exceeds 30MB");
        continue;
      }

      try {
        const { width, height } = await imageValidator(file);

        if (width < minDimension || height < minDimension) {
          toast.error(`Image must be at least ${minDimension}x${minDimension}`);
          continue;
        }

        validFiles.push(file);
      } catch (err) {
        console.error("Image validation failed:", err);
        toast.error("Failed to validate image");
      }
    }

    if (validFiles.length) {
      setImages(validFiles);
      setError(false);
    } else {
      setImages([]);
      setError(true);
    }
  };

  // Fetch contacts with React Query
  const { data: contacts = [] } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => getMessages({ limit: 100 }),
    select: (response) => {
      console.log("Contacts fetched:", response?.data);
      return response?.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  // Fetch messages for selected contact
  const { data: messageResponse = [], isLoading: messagesLoading } = useQuery({
    queryKey: ["messages", selectedContact?.id],
    queryFn: () =>
      selectedContact ? getMessageDetails({ id: selectedContact.id }) : [],
    enabled: !!selectedContact,
  });

  const allMessages: MessageReply[] = useMemo(() => {
    if (!messageResponse?.data) return [];

    const { message, replies } = messageResponse?.data;

    // Combine main message and replies, then sort by timestamp
    const combined = [message, ...replies].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    setParentId(message.id ?? 6);

    console.log("Message and replies:", combined);
    return combined;
  }, [messageResponse]);

  // Send message mutation
  // const sendMessageMutation = useMutation({
  //   mutationFn: api.sendMessage,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["messages", selectedContact?.id],
  //     });
  //     queryClient.invalidateQueries({ queryKey: ["contacts"] });
  //     setNewMessage("");
  //   },
  // });

  const filteredContacts = contacts?.filter(
    (contact) => contact.recipient !== null
  );

  const selectContact = async (contact: Contact) => {
    setSelectedContact(contact);
    setLoading(true);
    try {
      const messagesData = await getMessageDetails({ id: contact.id });
      setLocalMessages(messagesData?.data?.replies || []);

      console.log("Selected contact messages:", messagesData?.data);
      setLocalContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? { ...c, unread: 0 } : c))
      );
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async (contactId: number) => {
    try {
      await deleteMessage(contactId ?? 0);
      setLocalMessages((prev) => prev.filter((m) => m.id !== contactId));
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  const sendMessageWithImage = async (content = newMessage) => {
    if (!selectedContact) return;

    try {
      let formData = new FormData();
      formData.append("content", content);
      formData.append("recipient_id", `${selectedContact.recipient?.id || 0}`);
      formData.append("parent_id", `${parentId}`);
      for (let i = 0; i < images?.length; i++) {
        formData.append("media_files[]", images[i]);
      }

      const res = await sendMessageToUser(formData);

      queryClient.invalidateQueries({
        queryKey: ["messages", selectedContact?.id],
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
  const sendMessage = async (content = newMessage) => {
    if (
      !selectedContact ||
      (!content.trim() && (!images || images.length === 0))
    )
      return;

    if (images?.length > 0) {
      sendMessageWithImage(content);
      return;
    }

    try {
      const messageData = {
        recipient_id: selectedContact.recipient?.id || 0,
        content,
        parent_id: parentId,
      };
      const res = await sendMessageToUser(messageData);

      setLocalContacts((prev) =>
        prev.map((contact) =>
          contact.id === selectedContact.id
            ? { ...contact, lastMessage: content, timestamp: "now" }
            : contact
        )
      );
      queryClient.invalidateQueries({
        queryKey: ["messages", selectedContact?.id],
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const currentUserId = currentUser?.id;

  const formatTime = (timestamp: Date | string) => {
    const time =
      typeof timestamp === "string" ? new Date(timestamp) : timestamp;
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Contacts Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800 mb-3">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => selectContact(contact)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                Number(selectedContact?.id) === contact.id
                  ? "bg-blue-50 border-blue-200"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl">
                    {contact.recipient?.first_name[0]}
                    {contact.recipient?.last_name[0]}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900 truncate">
                      {contact.recipient?.first_name}{" "}
                      {contact.recipient?.last_name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatTime(contact.updated_at) || contact.updated_at}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-600 truncate">
                      {contact.content}
                    </p>

                    <span
                      onClick={() => handleDeleteContact(contact.id)}
                      className="bg-red-500 text-white text-xs rounded-full px-2 py-1.5 min-w-[20px] text-center"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    {selectedContact.avatar}
                  </div>
                  {selectedContact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h2 className="font-medium text-gray-900">
                    {selectedContact.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedContact.online ? "Online" : "Last seen recently"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <Phone className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <Video className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messagesLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                allMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender.id === currentUserId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender.id === currentUserId
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }`}
                    >
                      {"media" in message &&
                      message.media &&
                      message.media.length > 0 ? (
                        <div className="space-y-2">
                          {message.media.map((media) => (
                            <div key={media.id}>
                              {media.path !== "0" && (
                                <img
                                  src={getApiMedia(media.path)}
                                  alt="Shared image"
                                  className="max-w-full h-auto rounded"
                                />
                              )}
                            </div>
                          ))}
                          {message.content && (
                            <p className="mt-2">{message.content}</p>
                          )}
                        </div>
                      ) : (
                        <p>{message.content}</p>
                      )}
                      <p
                        className={`text-xs mt-1 ${
                          message.sender.id === currentUserId
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        {formatTime(message.created_at)}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={onChangeImages}
                  multiple={true}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  <Image className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={() => sendMessage()}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* No Chat Selected */
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                💬
              </div>
              <h2 className="text-xl font-medium text-gray-700 mb-2">
                Select a conversation
              </h2>
              <p className="text-gray-500">
                Choose from your existing conversations or start a new one
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
