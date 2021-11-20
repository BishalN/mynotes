import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

export const useIsAuth = () => {
  const token = localStorage.getItem("token");
  const router = useRouter();
  useEffect(() => {
    if (!token) router.push("/login");
    //TODO: Make call to backend to verify the token
  }, [token]);
};
