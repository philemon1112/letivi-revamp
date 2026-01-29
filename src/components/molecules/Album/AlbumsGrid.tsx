import React from "react";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { AlbumCard } from "./AlbumCard";
import { AlbumsData } from "@/types/common";
import AlbumsForms from "./Forms";
import SharePost from "@/components/organisms/Post/SharePost";
import { deleteAlbum, editAlbum } from "@/services/gallery";

interface Album {
  id: number;
  name: string;
  private: number;
  slug: string;
  posts: Array<{
    type: string;
    medias: Array<{
      path: string;
      large_thumbnail?: string;
    }>;
  }>;
  business_id: number | null;
  event_id: number | null;
  project_id: number | null;
}

interface AlbumsProps {
  privacyControl?: boolean;
  onAlbumClick: (data: { album: AlbumsData; location: string }) => void;
  entity?: string;
  isPublic?: boolean;
  business_id?: number;
  privacy?: number | boolean;
  albumsData?: AlbumsData[];
  canEditAlbum?: boolean;
  albumColumns?: number[];
  eventId?: number;
  eventAlbums?: AlbumsData[];
  personalAlbums?: AlbumsData[];
  projectAlbums?: AlbumsData[];
  projectId?: number;
  refetch: () => void;
}

export const AlbumsGrid: React.FC<AlbumsProps> = ({
  privacyControl = true,
  onAlbumClick,
  business_id,
  privacy,
  albumsData,
  canEditAlbum = true,
  albumColumns = [1, 2, 4],
  eventId,
  eventAlbums,
  personalAlbums,
  projectAlbums,
  projectId,
  refetch,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedAlbum, setSelectedAlbum] = React.useState<AlbumsData | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [shareModalOpen, setShareModalOpen] = React.useState(false);
  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);

  const handleDeleteAlbum = async (albumId: number) => {
    try {
      setIsLoading(true);
      await deleteAlbum(albumId);
      toast.success("Album deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete album");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleVisibility = async (album: AlbumsData) => {
    try {
      setIsLoading(true);
      await editAlbum(album.id, {
        name: album.name,
        private: album.private ? 0 : 1,
      });

      console.log("this happened");
      toast.success(`Album visibility updated`);
      refetch();
    } catch (error) {
      toast.error("Failed to update album visibility");
    } finally {
      setIsLoading(false);
    }
  };

  const renderAlbumGrid = () => {
    const albumsToRender =
      albumsData || eventAlbums || projectAlbums || personalAlbums;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-4 sm:p-5">
        {canEditAlbum && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <PlusCircle className="w-10 h-10 text-gray-500" />
            <span className="mt-2 text-gray-700">Add New Album</span>
          </button>
        )}

        {albumsToRender?.map((album: AlbumsData) => (
          <AlbumCard
            key={album.id}
            album={album}
            canEditAlbum={canEditAlbum}
            privacyControl={privacyControl}
            isDeleting={isLoading}
            onDelete={() => handleDeleteAlbum(album.id)}
            onEdit={() => {
              setSelectedAlbum(album);
              setIsModalOpen(true);
            }}
            onShare={() => {
              setSelectedSlug(album.slug);
              setShareModalOpen(true);
            }}
            handleDetails={() => {
              onAlbumClick({
                album,
                location: "special-path",
              });
            }}
            toggleVisible={() => handleToggleVisibility(album)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="overflow-x-hidden">
      {renderAlbumGrid()}

      {isModalOpen && (
        <AlbumsForms
          open={isModalOpen}
          handleModal={() => {
            setIsModalOpen(false);
            setSelectedAlbum(null);
          }}
          privacy={privacy ?? 0}
          album={selectedAlbum as AlbumsData}
          refetchAlbums={refetch}
          businessId={business_id}
          eventId={eventId}
          projectId={projectId}
        />
      )}

      {shareModalOpen && selectedSlug && (
        <SharePost
          handleModal={() => {
            setShareModalOpen(false);
            setSelectedSlug(null);
          }}
          url={`${selectedSlug}`}
          header={"Share Album"}
          text={"Or copy link to share"}
        />
      )}
    </div>
  );
};
