import { useState } from "react";
import AuthFormField from "./AuthFormField";
import { Button } from "@/components/ui/button";

import useLogin from "./useLogin";
import { PASSWORD_REGEX, PASSWORD_TITLE } from "./constants";

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
                title={PASSWORD_TITLE}
                pattern={PASSWORD_REGEX}
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
