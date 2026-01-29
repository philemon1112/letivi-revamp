import React, { useState, useRef } from "react";
import {
  MdClose,
  MdOutlineAttachFile,
  MdPlayCircleOutline,
} from "react-icons/md";
import { LuLoader, LuSend } from "react-icons/lu";
import { Contact } from "@/types/messages";
import { useSearchParams, useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { sendMessageToUser } from "@/services/messages";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FiImage, FiVideo } from "react-icons/fi";

interface ChatInputProps {
  selectedContact: Contact | null;
  parentId: number | null;
  recipient_email?: string | null;
  closeChat: () => void;
}

interface FilePreview {
  file: File;
  url: string;
  type: "image" | "video";
  dimensions?: { width: number; height: number };
  duration?: number;
}

function ChatInputBox({
  selectedContact,
  parentId,
  recipient_email,
  closeChat,
}: ChatInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [newMessage, setNewMessage] = useState<string>("");
  const userId = searchParams.get("userId");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();

  const imageValidator = (
    file: File,
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");

      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(img.src);
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const videoValidator = (
    file: File,
  ): Promise<{ width: number; height: number; duration: number }> => {
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

  const onChangeFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const validFiles: FilePreview[] = [];
    const maxSize = 30 * 1024 * 1024; // 30MB
    const minDimension = 200;
    const maxVideoDuration = 300; // 5 minutes

    for (const file of selectedFiles) {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      if (!isImage && !isVideo) {
        toast.error("Please select only image or video files");
        continue;
      }

      if (file.size > maxSize) {
        toast.error(`File size exceeds 30MB: ${file.name}`);
        continue;
      }

      try {
        let dimensions: { width: number; height: number } | undefined;
        let duration: number | undefined;

        if (isImage) {
          dimensions = await imageValidator(file);
          if (
            dimensions.width < minDimension ||
            dimensions.height < minDimension
          ) {
            toast.error(
              `Image must be at least ${minDimension}x${minDimension}: ${file.name}`,
            );
            continue;
          }
        } else if (isVideo) {
          const videoData = await videoValidator(file);
          dimensions = { width: videoData.width, height: videoData.height };
          duration = videoData.duration;

          if (duration > maxVideoDuration) {
            toast.error(`Video duration exceeds 5 minutes: ${file.name}`);
            continue;
          }

          if (
            dimensions.width < minDimension ||
            dimensions.height < minDimension
          ) {
            toast.error(
              `Video must be at least ${minDimension}x${minDimension}: ${file.name}`,
            );
            continue;
          }
        }

        const preview: FilePreview = {
          file,
          url: URL.createObjectURL(file),
          type: isImage ? "image" : "video",
          dimensions,
          duration,
        };

        validFiles.push(preview);
      } catch (err) {
        console.error("File validation failed:", err);
        toast.error(`Failed to validate file: ${file.name}`);
      }
    }

    if (validFiles.length) {
      setFiles((prev) => [...prev, ...validFiles]);
      setError(false);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCloseCompose = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("to");
    params.delete("userId");
    params.delete("userName");
    params.delete("startChat");
    params.delete("userPicture");
    params.delete("userEmail");

    const newQuery = params.toString();
    const newUrl = newQuery
      ? `${window.location.pathname}?${newQuery}`
      : window.location.pathname;

    router.push(newUrl);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      // Clean up object URL
      URL.revokeObjectURL(newFiles[index].url);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const sendMessageWithFiles = async (content = newMessage) => {
    if (!selectedContact) return;

    setIsSending(true);
    setUploadProgress(0);

    try {
      let formData = new FormData();
      formData.append("content", content);
      formData.append(
        "recipient_id",
        selectedContact?.recipient?.id
          ? `${selectedContact?.recipient?.id ?? ""}`
          : `${userId}`,
      );
      formData.append("parent_id", recipient_email ? "" : `${parentId}`);
      files.forEach((filePreview, index) => {
        formData.append("media_files[]", filePreview.file);
      });
      formData.append("recipient_email", recipient_email || "");

      // Simulate upload progress (replace with actual progress tracking)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      await sendMessageToUser(formData);

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Clean up
      files.forEach((file) => URL.revokeObjectURL(file.url));
      setFiles([]);
      setNewMessage("");
      if (parentId) {
        queryClient.invalidateQueries({
          queryKey: ["messages", selectedContact?.id],
        });
      }
    } catch (error) {
      toast.error("Failed to send message");
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
      setUploadProgress(0);
      handleCloseCompose();
    }
  };
  const sendMessage = async (content = newMessage) => {
    const hasRecipient = selectedContact || recipient_email;
    const hasContent = content.trim() || (files && files.length > 0);

    if (!hasRecipient || !hasContent) return;

    if (files?.length > 0) {
      sendMessageWithFiles(content);
      return;
    }

    try {
      const messageData = {
        recipient_id: selectedContact?.recipient?.id || Number(userId) || null,
        content,
        parent_id: parentId ? parentId : null,
        recipient_email,
      };
      await sendMessageToUser(messageData);
      setNewMessage("");
      if (parentId) {
        queryClient.invalidateQueries({
          queryKey: ["messages", selectedContact?.id],
        });
      }

      recipient_email &&
        queryClient.invalidateQueries({
          queryKey: ["contacts"],
        });
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
      handleCloseCompose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="absolute left-0 right-0 bottom-0 w-full bg-white border-t border-gray-200">
      {/* File Previews */}
      {files.length > 0 && (
        <div className="p-3 border-b border-gray-100">
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {files.map((filePreview, index) => (
              <div
                key={index}
                className="relative group bg-gray-100 rounded-lg overflow-hidden"
                style={{ width: "80px", height: "80px" }}
              >
                {filePreview.type === "image" ? (
                  <img
                    src={filePreview.url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
                    <video
                      src={filePreview.url}
                      className="w-full h-full object-cover"
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MdPlayCircleOutline className="text-white text-2xl" />
                    </div>
                    {filePreview.duration && (
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                        {formatDuration(filePreview.duration)}
                      </div>
                    )}
                  </div>
                )}

                {/* File type indicator */}
                <div className="absolute top-1 left-1 bg-black bg-opacity-70 text-white rounded p-1">
                  {filePreview.type === "image" ? (
                    <FiImage size={10} />
                  ) : (
                    <FiVideo size={10} />
                  )}
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={isSending}
                >
                  <MdClose size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {isSending && uploadProgress > 0 && uploadProgress < 100 && (
        <div className="px-3 py-2 border-b border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Uploading files...</span>
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <span>{uploadProgress}%</span>
          </div>
        </div>
      )}

      <label htmlFor="chat" className="sr-only">
        Write your message..
      </label>

      <div className="flex items-end px-3 py-2 gap-2">
        {/* Attach files button */}
        <input
          type="file"
          accept="image/*,video/*"
          ref={fileInputRef}
          onChange={onChangeFiles}
          multiple={true}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="rotate-45 text-2xl text-gray-500 hover:text-gray-700 transition-colors p-2"
          disabled={isSending}
        >
          <MdOutlineAttachFile />
        </button>

        {/* Message input */}
        <div className="flex-1 relative">
          <textarea
            id="chat"
            rows={1}
            className="block w-full text-base text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-3 outline-none resize-none max-h-32"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isSending}
            style={{ minHeight: "40px", maxHeight: "120px" }}
          />

          {/* Character count for long messages */}
          {newMessage.length > 500 && (
            <div className="absolute -top-6 right-2 text-xs text-gray-400">
              {newMessage.length}/2000
            </div>
          )}
        </div>

        {/* Send button */}
        <button
          onClick={() => sendMessage()}
          className={`p-3 text-white rounded-lg cursor-pointer transition-all ${
            isSending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-na_blue hover:brightness-110"
          } ${
            !newMessage.trim() && files.length === 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={isSending || (!newMessage.trim() && files.length === 0)}
        >
          {isSending ? (
            <LuLoader className="animate-spin" size={16} />
          ) : (
            <LuSend size={16} />
          )}
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </div>
  );
}

export default ChatInputBox;
