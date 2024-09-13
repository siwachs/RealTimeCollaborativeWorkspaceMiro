import { useState } from "react";
import { useMutation } from "convex/react";

export const useApiMutation = (mutationFunction: any) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFunction);

  const mutate = async (payload: any) => {
    setPending(true);

    try {
      return await apiMutation(payload);
    } finally {
      setPending(false);
    }
  };

  return {
    mutate,
    pending,
  };
};
