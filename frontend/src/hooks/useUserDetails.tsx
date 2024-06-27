// src/hooks/useUserDetails.tsx
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface UserDetails {
  firstName: string;
  lastName: string;
  userName: string;
}

const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const { firstName, lastName, username } = user;
      setUserDetails({
        firstName: firstName || "",
        lastName: lastName || "",
        userName: username || "",
      });
    }
  }, [user]);

  return userDetails;
};

export default useUserDetails;
