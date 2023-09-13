import { createContext } from "react";

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

export { AuthContext, type AuthContextState };
