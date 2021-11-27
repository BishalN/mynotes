import axios from "axios";
import { useMutation } from "react-query";
import { BASE_URL } from "../../utils/config";

export type LoginType = { email: string; password: string };
export type LoginError = {
  field: string;
  message: string;
};

export type SuccessLoginType = {
  token: string;
};

export default function useLogin() {
  return useMutation(
    ({ email, password }: LoginType) =>
      axios
        .post(`/login/local`, { password, email }, { baseURL: BASE_URL })
        .then((res) => res.data as SuccessLoginType),
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
