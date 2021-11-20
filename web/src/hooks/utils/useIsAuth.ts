import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { isServer } from "./isServer";

export const useIsAuth = () => {
  let token: string | null = "";
  if (!isServer) token = localStorage.getItem("token");
  const router = useRouter();
  useEffect(() => {
    if (!token) router.push("/login");
    //TODO: Make call to backend to verify the token
  }, [token]);
};
