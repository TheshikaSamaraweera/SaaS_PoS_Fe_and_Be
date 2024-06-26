import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const RedirectAfterSignIn = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const { firstName } = user;
      
      if (firstName === "cashier") {
        router.push("/cashier/dashboard");
      } else if (firstName === "branch-manager") {
        router.push("/branch-manager/dashboard");
      } else {
        router.push("/default/dashboard");
      }
    }
  }, [user, router]);

  return null; // This component does not render anything
};

export default RedirectAfterSignIn;
