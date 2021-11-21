import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useMeQuery } from "../query/useMeQuery";

export const useIsAuth = () => {
  const router = useRouter();
  const { data, isLoading } = useMeQuery();
  useEffect(() => {
    if (!isLoading && !data) router.push("/");
  }, [data, isLoading]);
};
