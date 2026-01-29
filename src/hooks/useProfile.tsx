// @ts-nocheck
import { getMyProfile, updateProfile } from "@/services/myProfile";
import { Professional } from "@/types/common/professional";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: () => getMyProfile(),
    select: (data) => data.data as unknown as Professional,
  });
};

export const useUpdateProfilePicture = (closeModal: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => updateProfile(data),
    onSuccess: () => {
      toast.success("Profile picture updated successfully.");
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
};

