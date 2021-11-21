import axios from "axios";
import { useMutation } from "react-query";

export type LoginType = { email: string; password: string };

export const useLogin = () => {
  return useMutation(
    ({ email, password }: LoginType) =>
      axios
        .post(
          `/login/local`,
          { password, email },
          { baseURL: process.env.NEXT_PUBLIC_API_BASE_URL }
        )
        .then((res) => res.data),
    {
      onMutate: (values) => {
        console.log(values);
      },
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (err: any) => {
        console.log(err);
      },
    }
  );
};
