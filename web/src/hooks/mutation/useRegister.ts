import axios from "axios";
import { useMutation } from "react-query";

export type RegisterType = { email: string; password: string; name: string };

export default function useRegister() {
  return useMutation(
    ({ email, password, name }: RegisterType) =>
      axios
        .post(
          `/register/local`,
          { password, email, name },
          { baseURL: process.env.NEXT_PUBLIC_API_BASE_URL }
        )
        .then((res) => res.data),
    {
      onMutate: (values) => {},
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (err: any) => {},
    }
  );
}
