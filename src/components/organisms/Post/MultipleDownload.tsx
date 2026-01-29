import { Button } from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getApiMedia } from "@/utils/getApiMedia";
import { Check } from "lucide-react";
import React, { useState } from "react";

function MultipleDownload({ type, post }: any) {
  const currentUser = useCurrentUser();
  const [selectedMediaIds, setSelectedMediaIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleMediaSelection = (id: number) => {
    console.log("post", post);
    setSelectedMediaIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleDownloadSelected = async () => {
    setLoading(true);
    for (const index of selectedMediaIds) {
      const media = post?.medias[index];
      if (!media) continue;

      const downloadUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${post?.id}/medias/${media?.id}/download?user_token=${currentUser?.user_token}`;

      try {
        const response = await fetch(downloadUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/octet-stream",
          },
        });

        if (!response.ok) {
          console.error(`Download failed for media ${media?.id}`);
          continue;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download =
          media?.filename ||
          (post?.source?.toLowerCase() === "personal"
            ? `Letivi-${post?.user?.first_name}-${post?.user?.last_name}-${media?.id}`
            : `Letivi-${
                post?.event?.name ?? post?.project?.name ?? post?.business?.name
              }` +
              "-" +
              media?.id);
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Download error:", error);
      }
    }

    // Clear selection after download attempt
    setLoading(false);
    setSelectedMediaIds([]);
  };

  return (
    <div className="w-full">
      <div
        className={`${
          type === "sidebar" && "h-[100vh]"
        } flex flex-col h-80 sm:h-fit-content`}
      >
        <Typography
          className="text-center text-lg sm:text-xl mb-2 sm:mb-4"
          weight={500}
        >
          Click to Select media to download
        </Typography>

        {/* Scrollable grid with padding at bottom for fixed button on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-2 h-svh overflow-y-auto scrollbar-thin pb-20 sm:pb-2">
          {post?.medias?.map((media: any, index: number) => (
            <div
              key={index}
              className="relative cursor-pointer h-fit"
              onClick={() => toggleMediaSelection(index)}
            >
              <img
                className={`
              w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg
              ${
                selectedMediaIds.includes(index)
                  ? "opacity-70 border-2 border-blue-500"
                  : ""
              }
            `}
                src={getApiMedia(media?.large_thumbnail || media?.path)}
                alt=""
              />

              {selectedMediaIds.includes(index) && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                  <Check size={16} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Fixed button on mobile, static on desktop */}
        <div className="fixed sm:static bottom-0 left-0 right-0 p-2 bg-white sm:bg-transparent border-t sm:border-t-0 border-gray-200 sm:mt-4 z-10">
          <Button
            loading={loading}
            disabled={!selectedMediaIds?.length || loading}
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleDownloadSelected}
          >
            Download selected Media{" "}
            {selectedMediaIds.length > 0 && `(${selectedMediaIds?.length})`}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MultipleDownload;
