import { useQuery } from "react-query";
import axios from "axios";
import { User } from "../../utils";
import { ErrorResponse } from "../../utils/types";

export const useMeQuery = () => {
  return useQuery<User, ErrorResponse>(
    "me",
    async () => {
      const token = JSON.parse(localStorage.getItem("token")!);
      const res = await axios.get("/me", {
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    { staleTime: 1000 * 60 * 5 }
  );
};
