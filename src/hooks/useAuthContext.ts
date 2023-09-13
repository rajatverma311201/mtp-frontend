import { AuthContext } from "@/contexts/authContext";
import { useContext } from "react";

function useAuthContext() {
    const authCtx = useContext(AuthContext);
    return authCtx;
}

export default useAuthContext;
