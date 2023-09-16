import { LoginRequest, SignUpRequest, XirrTransaction } from "types";
import Fetch from "./Fetch";
import { HTTP } from "@/utils/constants";

export const Auth = {
    signup: async (obj: SignUpRequest) => {
        const data = await Fetch(
            `/auth/signup`,
            HTTP.POST,
            "",
            JSON.stringify(obj),
        );

        return data;
    },
    login: async (obj: LoginRequest) => {
        const data = await Fetch(
            `/auth/login`,
            HTTP.POST,
            "",
            JSON.stringify(obj),
        );

        return data;
    },
};

export const Calculator = {
    getXirrInvestments: async (jwt: string) => {
        const data = await Fetch(`/xirrs`, HTTP.GET, jwt);
        return data;
    },

    addXirrInvestments: async (
        { amount, date }: XirrTransaction,
        jwt: string,
    ) => {
        const body = { amount, date };
        const data = await Fetch(
            `/xirrs`,
            HTTP.POST,
            jwt,
            JSON.stringify(body),
        );

        return data;
    },
};
