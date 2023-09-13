import { useLocalStorageState } from "@/hooks";
import { LS } from "@/utils/constants";
import { ReactElement } from "react";
import { AuthContext, AuthContextState } from "./authContext";

export default function AuthContextProvider({
    children,
}: {
    children: ReactElement;
}): React.ReactElement {
    const [jwt, setJwt] = useLocalStorageState("", LS.JWT);
    const [user, setUser] = useLocalStorageState({}, LS.USER);
    const [jwtExpire, setJwtExpire] = useLocalStorageState("", LS.JWT_EXPIRES);

    const clear = () => {
        setJwt("");
        setUser({});
        setJwtExpire("");
    };

    const val: AuthContextState = {
        jwt,
        user,
        jwtExpire,
        setUser,
        setJwtExpire,
        setJwt,
        clear,
    };

    return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>;
}
