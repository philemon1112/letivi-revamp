import { cookies } from "next/headers";

// TODO: Implement the following functions
// 1. use AUTH_TOKEN form env for baseURl , x-api-key and x-api-secret
export async function getSharedAlbumDetails2(albumId: string) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("AUTH_TOKEN")?.value;

    const makeRequest = async (authToken?: string) => {
      const headers = {
        "x-api-key": "letivi-2023-v1",
        "x-api-secret": "s0meR3ndomP@$$Word",
        "Content-Type": "application/json",
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/album/${albumId}`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch album details");
      }

      return response.json();
    };

    return makeRequest(token);
  } catch (error) {
    console.error("Error fetching album details:", error);
    throw error;
  }
}

export async function getSharedPost2(postId: string) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("AUTH_TOKEN")?.value;

    const makeRequest = async (authToken?: string) => {
      const headers = {
        "x-api-key": "letivi-2023-v1",
        "x-api-secret": "s0meR3ndomP@$$Word",
        "Content-Type": "application/json",
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${postId}`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch album details");
      }

      return response.json();
    };

    return makeRequest(token);
  } catch (error) {
    console.error("Error fetching album details:", error);
    throw error;
  }
}

export async function getSharedUserProfile(
  userName: string,
  loggedInUserId: string | null
) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("AUTH_TOKEN")?.value;

    const makeRequest = async (authToken?: string) => {
      const headers = {
        "x-api-key": "letivi-2023-v1",
        "x-api-secret": "s0meR3ndomP@$$Word",
        "Content-Type": "application/json",
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profiles/${userName}`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      return response.json();
    };

    return makeRequest(token);
  } catch (error) {
    console.error("Error fetching album details:", error);
    throw error;
  }
}

export async function getSharedBusinessProfile(name: string) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("AUTH_TOKEN")?.value;

    const makeRequest = async (authToken?: string) => {
      const headers = {
        "x-api-key": "letivi-2023-v1",
        "x-api-secret": "s0meR3ndomP@$$Word",
        "Content-Type": "application/json",
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/business/${name}`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch business details");
      }

      return response.json();
    };

    return makeRequest(token);
  } catch (error) {
    console.error("Error fetching album details:", error);
    throw error;
  }
}

export async function getSharedProjectProfile(name: string) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("AUTH_TOKEN")?.value;

    const makeRequest = async (authToken?: string) => {
      const headers = {
        "x-api-key": "letivi-2023-v1",
        "x-api-secret": "s0meR3ndomP@$$Word",
        "Content-Type": "application/json",
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/project/${name}`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch event details");
      }

      return response.json();
    };

    return makeRequest(token);
  } catch (error) {
    console.error("Error fetching album details:", error);
    throw error;
  }
}

export async function getSharedEventProfile(name: string) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("AUTH_TOKEN")?.value;

    const makeRequest = async (authToken?: string) => {
      const headers = {
        "x-api-key": "letivi-2023-v1",
        "x-api-secret": "s0meR3ndomP@$$Word",
        "Content-Type": "application/json",
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/event/${name}`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch event details");
      }

      return response.json();
    };

    return makeRequest(token);
  } catch (error) {
    console.error("Error fetching album details:", error);
    throw error;
  }
}
