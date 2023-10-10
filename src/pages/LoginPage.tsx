import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/features/auth/LoginForm";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const isLoggedIn = useAuth();
    const navigate = useNavigate();
    if (isLoggedIn) {
        navigate(-1);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Welcome To MTP</CardTitle>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
        </Card>
    );
}

export default LoginPage;
