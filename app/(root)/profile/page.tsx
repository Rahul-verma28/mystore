"use client";

import { getUser } from "@/lib/getUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch user data on page load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        console.log(userData);
        if (!userData) {
          router.push("/login");
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Unauthorized. Please login to view your profile.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Failed to logout");
        setError("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      setError("An unexpected error occurred during logout.");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-red-100 text-red-600 p-4 rounded shadow-md">
          {error}
        </div>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Render profile
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="mb-4">
          <strong>Name:</strong> {user.name}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {user.email}
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
