import useAuthContext from "@/hooks/useAuthContext";
import { Calculator } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XirrTransaction } from "types";

function useAddInvestment() {
    const queryClient = useQueryClient();
    const authCtx = useAuthContext();
    const jwt = authCtx.jwt;

    const { mutate: addInvestment, isLoading } = useMutation({
        mutationFn: ({ amount, date }: XirrTransaction) =>
            Calculator.addXirrInvestments({ amount, date }, jwt),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch-xirr"] });
        },

        onError: () => {},
    });

    return { addInvestment, isLoading };
}

export default useAddInvestment;
