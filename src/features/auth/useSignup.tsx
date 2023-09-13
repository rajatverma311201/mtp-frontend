import Message from "@/components/Message";
import { useToast } from "@/components/ui/use-toast";
import useAuthContext from "@/hooks/useAuthContext";
import { Auth } from "@/services/api";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { SignUpRequest } from "types";

export default function useSignup() {
    const { toast } = useToast();

    const navigate = useNavigate();

    const authCtx = useAuthContext();

    const { mutate: signup, isLoading } = useMutation({
        mutationFn: ({
            firstName,
            lastName,
            email,
            password,
            mobile,
        }: SignUpRequest) =>
            Auth.signup({ firstName, lastName, email, password, mobile }),

        onSuccess: (data) => {
            console.log(data);

            authCtx.setUser(data.data);
            authCtx.setJwt(data.token);
            authCtx.setJwtExpire(data.jwtExpire);

            toast({
                title: "Sign Up Successful",
                variant: "success",
            });

            navigate("/");
        },

        onError: ({ message }: { message: string }) => {
            toast({
                variant: "destructive",
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                title: (<Message msg={message} />) as any,
                // title: message,
            });
        },
    });
    return { signup, isLoading };
}
