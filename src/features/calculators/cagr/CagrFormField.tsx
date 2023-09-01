import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type CagrFormFieldProps = {
    label: string;
    val: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const CagrFormField = ({ label, val, onChange }: CagrFormFieldProps) => {
    return (
        <>
            <div className="flex flex-col space-y-1.5">
                <Label
                    className="text-left text-lg"
                    htmlFor={label.split(/\s+/).join("-")}
                >
                    {label}
                </Label>
                <Input
                    id={label.split(/\s+/).join("-")}
                    type="number"
                    value={val}
                    onChange={onChange}
                />
            </div>
        </>
    );
};
export default CagrFormField;
