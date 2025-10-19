import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const queryQlient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting successfully edited");
      queryQlient.invalidateQueries({
        queryKey: ["settings"],
      });
      //   reset();
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateSetting, isUpdating };
}
