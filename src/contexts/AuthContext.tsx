import { useLocalStorageState } from "@/hooks";
import { LS } from "@/utils/constants";
import { ReactElement, createContext } from "react";

type AuthContextState = {
    user: UserObj;
    jwt: string;
    jwtExpire: string;
    setUser: (u: UserObj) => void;
    setJwt: (j: string) => void;
    setJwtExpire: (je: string) => void;
    clear: () => void;
};

type UserObj = {
    [key: string]: string | number;
};

const AuthContext = createContext<AuthContextState>({
    user: {},
    jwt: "",
    jwtExpire: "",
    setUser: (a) => {
        a;
    },
    setJwtExpire: (a) => {
        a;
    },
    setJwt: (a) => {
        a;
    },
    clear: () => {},
});

function AuthContextProvider({ children }: { children: ReactElement }) {
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

export { AuthContext, AuthContextProvider };
