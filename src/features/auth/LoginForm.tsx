import { useState } from "react";
import AuthFormField from "./AuthFormField";
import { Button } from "@/components/ui/button";

import useLogin from "./useLogin";
import { AUTH } from "@/utils/constants";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { isLoading, login } = useLogin();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        login({ email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full lg:w-96">
            <AuthFormField
                req
                type="email"
                label="Email"
                val={email}
                action={(v) => setEmail(v)}
            />
            
            <AuthFormField
                title={AUTH.PASSWORD_TITLE}
                pattern={AUTH.PASSWORD_REGEX}
                req
                type="password"
                label="Password"
                val={password}
                action={(v) => setPassword(v)}
            />
            <div className="mt-10 flex justify-center">
                <Button disabled={isLoading}>
                    {isLoading ? "Please Wait" : "Login"}
                </Button>
            </div>
        </form>
    );
}

export default LoginForm;
