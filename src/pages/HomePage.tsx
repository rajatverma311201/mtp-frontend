import { Button, buttonVariants } from "@/components/ui/button";
import useAuthContext from "@/hooks/useAuthContext";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <>
            <div>
                <h1>Home Page</h1>
                <div>
                    <Link
                        className={buttonVariants({ variant: "outline" })}
                        to="/calculators"
                    >
                        Calculators
                    </Link>
                    <Link
                        className={buttonVariants({ variant: "outline" })}
                        to="/login"
                    >
                        Login
                    </Link>
                    <Link
                        className={buttonVariants({ variant: "outline" })}
                        to="/signup"
                    >
                        Signup
                    </Link>
                </div>
            </div>
            <UserDetails />
            <Logout />
        </>
    );
}

export default HomePage;

function UserDetails() {
    const authCtx = useAuthContext();

    return <div>{authCtx.user.first_name}</div>;
}

function Logout() {
    const authCtx = useAuthContext();

    return <Button onClick={() => authCtx.clear()}>Logout</Button>;
}
