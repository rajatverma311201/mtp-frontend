import { Auth } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { LoginRequest } from "types";
import { useToast } from "@/components/ui/use-toast";
import Message from "@/components/Message";

import { useNavigate } from "react-router-dom";
import useAuthContext from "@/hooks/useAuthContext";

export default function useLogin() {
    const { toast } = useToast();

    const authCtx = useAuthContext();

    const navigate = useNavigate();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }: LoginRequest) =>
            Auth.login({ email, password }),

        onSuccess: (data) => {
            console.log(data);

            authCtx.setUser(data.data);
            authCtx.setJwt(data.token);
            authCtx.setJwtExpire(data.jwtExpire);

            navigate("/");
        },
        onError: ({ message }: { message: string }) => {
            toast({
                variant: "destructive",
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                title: (<Message msg={message} />) as any,
            });
        },
    });

    return { isLoading, login };
}
