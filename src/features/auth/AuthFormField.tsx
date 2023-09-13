import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthFormFieldProps = {
    title?: string;
    pattern?: string;
    req?: boolean;
    type?: string;
    label: string;
    val: string;
    action: (val: string) => void;
};

function AuthFormField({
    title,
    pattern,
    req,
    type,
    label,
    val,
    action,
}: AuthFormFieldProps) {
    return (
        <div className="mt-5 flex flex-col justify-start gap-2">
            <Label htmlFor={label} className="text-md">
                {label}
            </Label>
            <Input
                title={title}
                pattern={pattern}
                type={type}
                value={val}
                onChange={(e) => action(e.target.value)}
                className="border-gray-500"
                id={label}
                required={req ? true : false}
            />
        </div>
    );
}

export default AuthFormField;
