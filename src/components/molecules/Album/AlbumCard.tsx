import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getApiMedia } from "@/utils/getApiMedia";
import {
  MoreVertical,
  EyeOff,
  Images,
  Pencil,
  Trash2,
  Share2,
  EyeIcon,
} from "lucide-react";
import { AlbumsData } from "@/types/common";

interface Media {
  large_thumbnail?: string;
  path: string;
}

interface Post {
  type: string;
  medias: Media[];
}

interface MenuAction {
  name: string;
  action: "private" | "share" | "delete" | "edit";
  icon: React.ReactNode;
}

interface AlbumCardProps {
  album: AlbumsData;
  handleDetails: () => void;
  canEditAlbum: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
  isDeleting: boolean;
  toggleVisible: () => void;
  privacyControl: boolean;
}

export function AlbumCard({
  album,
  handleDetails,
  canEditAlbum,
  onEdit,
  onDelete,
  onShare,
  isDeleting,
  toggleVisible,
  privacyControl,
}: AlbumCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const message_actions: MenuAction[] = React.useMemo(
    () => [
      ...(privacyControl
        ? [
            {
              name: album.private === 1 ? "Toggle Privacy" : "Toggle Privacy",
              action: "private" as const,
              icon:
                album.private === 1 ? (
                  <EyeOff className="h-4 w-4 mr-2" />
                ) : (
                  <EyeIcon className="h-4 w-4 mr-2" />
                ),
            },
          ]
        : []),
      {
        name: "Share Album",
        action: "share" as const,
        icon: <Share2 className="h-4 w-4 mr-2" />,
      },
      {
        name: "Edit Album",
        action: "edit" as const,
        icon: <Pencil className="h-4 w-4 mr-2" />,
      },
      {
        name: "Delete Album",
        action: "delete" as const,
        icon: <Trash2 className="h-4 w-4 mr-2" />,
      },
    ],
    [privacyControl, album.private]
  );

  const getThumbnailUrl = (): string => {
    const imagePost = album?.posts?.find((post) => post?.type === "image");
    if ((imagePost?.medias ?? []).length > 0) {
      const media = imagePost?.medias[0];
      return `${getApiMedia(media?.large_thumbnail || media?.path || "")}`;
    }
    return "/assets/Img/letiviAlbum.png";
  };

  const handleAction = (action: MenuAction["action"]): void => {
    setIsOpen(false);
    switch (action) {
      case "share":
        onShare();
        break;
      case "delete":
        onDelete();
        break;
      case "edit":
        onEdit();
        break;
      case "private":
        toggleVisible();
        break;
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-200"
      onClick={handleDetails}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleDetails();
        }
      }}
    >
      <div className="p-2.5">
        <div className="relative pt-[120%]">
          <Image
            src={getThumbnailUrl()}
            alt={`Album cover for ${album.name}`}
            fill
            className="rounded-md object-cover"
            priority={false}
          />
        </div>

        <h3 className="font-black py-2.5 tracking-wider uppercase truncate">
          {album.name}
        </h3>

        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm">
            <Images className="w-4 h-4 text-blue-600 mr-1" />
            <span>{album?.posts?.length || 0}</span>
          </div>

          {canEditAlbum && (
            <div
              className="relative"
              ref={dropdownRef}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Open album menu"
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                <MoreVertical className="w-5 h-5 text-gray-500 opacity-80" />
              </button>

              {isOpen && (
                <div
                  className="absolute right-0 bottom-10 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="album-menu"
                >
                  {message_actions.map((action) => (
                    <button
                      key={action.action}
                      onClick={() => handleAction(action.action)}
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center focus:outline-none focus:bg-gray-100"
                      role="menuitem"
                      type="button"
                    >
                      {action.icon}
                      <span>{action.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
