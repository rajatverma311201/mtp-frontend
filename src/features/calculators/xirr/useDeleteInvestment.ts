import { useAuthContext } from "@/hooks";
import { Calculator } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteInvestment() {
    const queryClient = useQueryClient();
    const authCtx = useAuthContext();
    const jwt = authCtx.jwt;

    const { mutate: deleteInvestment, isLoading: isDeleting } = useMutation({
        mutationFn: (date: Date) => Calculator.deleteXirrInvestment(date, jwt),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch-xirr"] });
        },

        onError: () => {},
    });

    return { deleteInvestment, isDeleting };
}

export default useDeleteInvestment;
