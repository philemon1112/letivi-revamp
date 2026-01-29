"use client";
import { useEffect } from "react";
import { CarouselModal } from "@/components/molecules/PostGalleryItem";
import { useImpression } from "@/hooks/usePost";
import { useRouter } from "next/navigation";

function SharedPostDetails({ post }: any) {
  const router = useRouter();
  const { mutate: triggerImpression } = useImpression();

  // Trigger impression when the component mounts
  useEffect(() => {
    if (post?.id) {
      triggerImpression(post?.id);
    }
  }, [post, triggerImpression]);
  return (
    <div>
      <CarouselModal
        isOpen={true}
        onClose={() => router.push("/")}
        currentPost={post}
        currentImgIndex={0}
        onNext={() => console.log("next")}
        onPrevious={() => console.log("previous")}
        isSharedPost={true}
      />
    </div>
  );
}

export default SharedPostDetails;
