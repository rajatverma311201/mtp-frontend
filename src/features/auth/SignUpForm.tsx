import { Button } from "@/components/ui/button";
import AuthFormField from "./AuthFormField";
import { useReducer } from "react";
import {
    initialState,
    reducer,
    setEmail,
    setFirstName,
    setLastName,
    setMobile,
    setPassword,
    setPasswordConfirm,
} from "./authUtil";
import useSignup from "./useSignup";
import { PASSWORD_REGEX, PASSWORD_TITLE } from "./constants";
import { useToast } from "@/components/ui/use-toast";

function SignUpForm() {
    const [
        { firstName, lastName, email, password, passwordConfirm, mobile },
        dispatch,
    ] = useReducer(reducer, initialState);
    const { toast } = useToast();

    const { isLoading, signup } = useSignup();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password != passwordConfirm) {
            toast({
                title: "Error",
                description: "Password Does not Match Confirm Password",
            });
            return;
        }

        signup({
            firstName,
            lastName,
            email,
            password,
            mobile,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full lg:w-96">
            <div className="flex flex-row gap-2">
                <AuthFormField
                    title="Name should only contain letters."
                    pattern="^[A-Za-z]+$"
                    req
                    label="First Name"
                    val={firstName}
                    action={(v) => dispatch(setFirstName(v))}
                />
                <AuthFormField
                    title="Name should only contain letters."
                    pattern="^[A-Za-z]+$"
                    label="Last Name"
                    val={lastName}
                    action={(v) => dispatch(setLastName(v))}
                />
            </div>
            <AuthFormField
                req
                type="email"
                label="Email"
                val={email}
                action={(v) => dispatch(setEmail(v))}
            />
            <div className="flex flex-row gap-2">
                <AuthFormField
                    title={PASSWORD_TITLE}
                    pattern={PASSWORD_REGEX}
                    req
                    type="password"
                    label="Password"
                    val={password}
                    action={(v) => dispatch(setPassword(v))}
                />

                <AuthFormField
                    title={PASSWORD_TITLE}
                    pattern={PASSWORD_REGEX}
                    req
                    type="password"
                    label="Password Confirm"
                    val={passwordConfirm}
                    action={(v) => dispatch(setPasswordConfirm(v))}
                />
            </div>
            <AuthFormField
                title="Should Contain 10 Digits"
                pattern="^[1-9]\d{9}$"
                req
                label="Mobile"
                val={mobile}
                action={(v) => dispatch(setMobile(v))}
            />
            <div className="mt-10 flex justify-center">
                <Button disabled={isLoading}>
                    {isLoading ? "Please Wait..." : "SignUp"}
                </Button>
            </div>
        </form>
    );
}

export default SignUpForm;
