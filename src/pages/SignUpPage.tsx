import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "@/features/auth/SignUpForm";

function SignUpPage() {
    return (
        <div className="flex h-screen items-center justify-center px-5">
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up To MTP</CardTitle>
                </CardHeader>
                <CardContent>
                    <SignUpForm />
                </CardContent>
            </Card>
        </div>
    );
}

export default SignUpPage;
