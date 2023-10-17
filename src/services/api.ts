import { LoginRequest, SignUpRequest, XirrTransaction } from "types";
import Fetch from "./Fetch";
import { HTTP } from "@/utils/constants";

const BASE_URL = import.meta.env.VITE_API_URL;

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
    getStocks: async (searchText: string) => {
        // const res = await fetch(
        //     `http://127.0.0.1:3000/api/stocks?q=${searchText}`,
        // );

        // const searchRes = await res.json();

        // if (!res.ok) {
        //     return [];
        // } else {
        //     return searchRes.content;
        // }

        const searchRes = await Fetch(
            `http://127.0.0.1:3000/api/stocks?q=${searchText}`,
            HTTP.GET,
        );

        return searchRes.content;
    },

    getStockDetails: async (searchId: string) => {
        const searchRes = await Fetch(
            `http://127.0.0.1:3000/api/stocks/${searchId}`,
            HTTP.GET,
        );
        return searchRes;
    },

    getStockChartData: async (
        exchange: string,
        scriptCode: string,
        duration: string,
        interval: string,
    ) => {
        const searchRes = await Fetch(
            `http://127.0.0.1:3000/api/stocks/${exchange}/${scriptCode}/${duration}?` +
                new URLSearchParams({
                    interval: interval,
                }),
            HTTP.GET,
        );

        return searchRes;
    },
};
