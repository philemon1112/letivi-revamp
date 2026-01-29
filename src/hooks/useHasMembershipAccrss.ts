// hooks/useHasMembershipAccess.ts
import { getUserFromLocalStorage } from "@/utils/getUserFromLocalStorage";

export const useHasMembershipAccess = (post: {
  business?: { id: any };
  event?: { id: any };
  project?: { id: any };
  user?: { id: string };
}): boolean => {
  const currentUser = getUserFromLocalStorage();

  if (!currentUser) return false;

  const isBusinessMember =
    post.business?.id &&
    currentUser?.businesses_membership?.some(
      (business: { id: any }) => business.id === post.business?.id
    );

  const isEventMember =
    post.event?.id &&
    currentUser?.events_membership?.some(
      (event: { id: any }) => event.id === post.event?.id
    );

  const isProjectMember =
    post.project?.id &&
    currentUser?.projects_membership?.some(
      (project: { id: any }) => project.id === post.project?.id
    );

  return Boolean(
    isBusinessMember ||
      isEventMember ||
      isProjectMember ||
      currentUser.id === post?.user?.id
  );
};
