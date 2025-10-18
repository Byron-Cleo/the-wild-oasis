import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryQlient = useQueryClient();

  //CREATING CABIN DEFINITION
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryQlient.invalidateQueries({
        queryKey: ["cabins"],
      });
      //   reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
