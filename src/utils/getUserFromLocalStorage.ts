export const getUserFromLocalStorage = () => {
  // Check if we're in the browser
  if (globalThis.window !== undefined) {
    const user = localStorage.getItem("USER");
    if (user) {
      try {
        return JSON.parse(user);
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
        return null;
      }
    }
  }
  return null;
};
