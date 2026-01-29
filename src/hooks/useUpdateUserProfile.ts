import { updateUserProfile } from "@/services/biography";
import { BasicFormData } from "@/types/biography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BasicFormData) => updateUserProfile(data),
    onSuccess: () => {
      toast.success("Profile updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["myProfile"] }); // Refetch profile data
    },
    onError: (error) => {
      toast.error("Failed to update profile. Please try again.");
      console.error("Profile update error:", error);
    },
  });
};
