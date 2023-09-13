import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/features/auth/LoginForm";

function LoginPage() {
    return (
        <div className="flex h-screen items-center justify-center px-5">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome To MTP</CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginPage;
