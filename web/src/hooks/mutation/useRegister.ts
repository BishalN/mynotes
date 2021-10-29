import axios from 'axios';
import { useMutation } from 'react-query';

export type LoginType = { email: string; password: string };
export type LoginError = {
  field: string;
  message: string;
};

export default function useRegister() {
  return useMutation(
    ({ email, password }: LoginType) =>
      axios
        .post(
          `/auth/local`,
          { password, email },
          { baseURL: process.env.NEXT_PUBLIC_API_BASE_URL }
        )
        .then((res) => res.data),
    {
      onMutate: (values) => {
        // console.log(values);
      },
      onSuccess: (data) => {
        // console.log(data);
        console.log(data);
      },
      onError: (err: any) => {
        // console.log(err.response);
      },
    }
  );
}
