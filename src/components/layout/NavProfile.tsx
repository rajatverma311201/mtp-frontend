import { useAuth, useAuthContext } from "@/hooks";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";

function NavProfile() {
    const authCtx = useAuthContext();
    const isLoggedIn = useAuth();
    const navigate = useNavigate();

    return (
        <div className="nav-profile-container flex items-center gap-5 text-lg">
            {isLoggedIn && (
                <>
                    <div>{authCtx.user.first_name}</div>
                    <Button
                        onClick={() => {
                            authCtx.clear();
                            navigate("/", { replace: true });
                        }}
                    >
                        Logout
                    </Button>
                </>
            )}
            {!isLoggedIn && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            )}
        </div>
    );
}

export default NavProfile;
