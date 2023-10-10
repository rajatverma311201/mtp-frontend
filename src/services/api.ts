import {
    LoginRequest,
    SignUpRequest,
    XirrTransaction,
    StockParams,
} from "types";
import Fetch from "./Fetch";
import { HTTP } from "@/utils/constants";

const BASE_URL = "http://127.0.0.1:3000/api";

export const Auth = {
    signup: async (obj: SignUpRequest) => {
        const data = await Fetch(
            `${BASE_URL}/auth/signup`,
            HTTP.POST,
            "",
            JSON.stringify(obj),
        );

        return data;
    },
    login: async (obj: LoginRequest) => {
        const data = await Fetch(
            `${BASE_URL}/auth/login`,
            HTTP.POST,
            "",
            JSON.stringify(obj),
        );

        return data;
    },
};

export const Calculator = {
    getXirrInvestments: async (jwt: string) => {
        const data = await Fetch(`${BASE_URL}/xirrs`, HTTP.GET, jwt);
        return data;
    },

    addXirrInvestments: async (
        { amount, date }: XirrTransaction,
        jwt: string,
    ) => {
        const body = { amount, date: (date as Date).getTime() };

        const data = await Fetch(
            `${BASE_URL}/xirrs`,
            HTTP.POST,
            jwt,
            JSON.stringify(body),
        );

        return data;
    },

    deleteXirrInvestment: async (date: Date, jwt: string) => {
        const body = { date: (date as Date).getTime() };
        const data = await Fetch(
            `${BASE_URL}/xirrs`,
            HTTP.DELETE,
            jwt,
            JSON.stringify(body),
        );

        return data;
    },
};

export const Stocks = {
    getStockList: async (params: StockParams) => {
        const paramString = new URLSearchParams(params);

        const data = await Fetch(
            `https://api.twelvedata.com/stocks?${paramString}`,
            HTTP.GET,
        );

        console.log(data);

        // return data;
    },
};
