import axios from 'axios';
import { useMutation } from 'react-query';
import { BASE_URL } from '../../utils/config';

export type LoginType = { email: string; password: string };
export type LoginError = {
  field: string;
  message: string;
};

export default function useLogin() {
  return useMutation(
    ({ email, password }: LoginType) =>
      axios
        .post(`/auth/local/login`, { password, email }, { baseURL: BASE_URL })
        .then((res) => res.data),
    {
      onMutate: (values) => {
        // console.log(values);
      },
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (err: any) => {
        // console.log(err.response);
      },
    }
  );
}
