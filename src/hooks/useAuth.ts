import { useEffect, useState } from "react";
import useAuthContext from "./useAuthContext";

function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const authCtx = useAuthContext();

    const jwt = authCtx.jwt;
    const jwtExpires = authCtx.jwtExpire;

    useEffect(() => {
        const isExpired = Date.now() >= +jwtExpires;
        if (jwt && !isExpired) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [jwt, jwtExpires]);

    return isLoggedIn;
}

export default useAuth;
