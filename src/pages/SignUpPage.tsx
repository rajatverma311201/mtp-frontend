import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "@/features/auth/SignUpForm";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
    const isLoggedIn = useAuth();
    const navigate = useNavigate();
    if (isLoggedIn) {
        navigate(-1);
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign Up To MTP</CardTitle>
            </CardHeader>
            <CardContent>
                <SignUpForm />
            </CardContent>
        </Card>
    );
}

export default SignUpPage;
