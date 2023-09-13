import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

function useAuthContext() {
    const authCtx = useContext(AuthContext);
    return authCtx;
}

export default useAuthContext;
