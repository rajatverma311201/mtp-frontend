import { LoginRequest, SignUpRequest } from "types";

const BASE_URL = "http://127.0.0.1:3000/api";
export const Auth = {
    signup: async (obj: SignUpRequest) => {
        const res = await fetch(`${BASE_URL}/auth/signup`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        if (!res.ok) {
            if (data.message) {
                throw new Error(data.message);
            }
            throw new Error("Something went wrong!");
        }

        return data;
    },
    login: async (obj: LoginRequest) => {
        console.log(obj);
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        if (!res.ok) {
            if (data.message) {
                console.log(data);
                throw new Error(data.message);
            }
            throw new Error("Something went wrong!");
        }

        return data;
    },
};
