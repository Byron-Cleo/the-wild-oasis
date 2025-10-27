import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      //the replace where the user was in earlier in the history stack
      navigate("/login", { replace: true });
      //remove user data and any other data from cache
      queryClient.removeQueries();
    },
  });

  return { logout, isLoading };
}
