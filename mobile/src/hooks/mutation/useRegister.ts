import axios from "axios";
import { useMutation } from "react-query";
import { BASE_URL } from "../../utils/config";

export type RegisterType = { email: string; password: string; name: string };

export default function useRegister() {
  return useMutation(
    ({ email, password, name }: RegisterType) =>
      axios
        .post(
          `/register/local`,
          { password, email, name },
          { baseURL: BASE_URL }
        )
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
