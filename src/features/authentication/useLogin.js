import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    const queryclient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      //this is manually setting data into the react query cache
      queryclient.setQueriesData(["user"], user.user);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log("error from login", error);
      toast.error("The provide Email or Password are incorrect.");
    },
  });

  return { login, isLoading };
}
