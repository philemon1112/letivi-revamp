// import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getUserFromLocalStorage } from "@/utils/getUserFromLocalStorage";

export const usePermission = (permissionName: string) => {
  const currentUser = getUserFromLocalStorage();
  // users permission are only gotten after logging in making it impossible to get the permission of the user after they login, unless we get data from local storage

  const hasPermission = currentUser?.user_permissions?.some(
    (permission: { name: string }) => permission.name === permissionName
  );

  return hasPermission || false;
};
