
export const getUser = async (): Promise<UserType | null> => {
  try {
    const response = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const user: UserType = await response.json();
      return user;
    }

    if (response.status === 404) {
      console.error("User not found.");
      return null;
    }

    console.error(`Unexpected error: ${response.statusText}`);
    return null;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
};
