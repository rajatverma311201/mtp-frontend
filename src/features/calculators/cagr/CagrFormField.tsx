import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

type CagrFormFieldProps = {
    label: string;
    val: number;
    action: (value: number) => void;
};

const CagrFormField = ({ label, val, action }: CagrFormFieldProps) => {
    return (
        <div className="mb-10 flex flex-col gap-8">
            <div className="  flex items-center justify-between gap-10">
                <Label
                    className="text-left text-lg"
                    htmlFor={label.split(/\s+/).join("-")}
                >
                    {label}
                </Label>
                <Input
                    className="w-32"
                    id={label.split(/\s+/).join("-")}
                    type={label === "Years" ? "text" : "number"}
                    value={val}
                    onChange={(e) => action(+e.target.value)}
                />
            </div>
            <Slider
                value={[val]}
                min={label === "Years" ? 1 : 1000}
                max={label === "Years" ? 100 : 1000_000}
                onValueChange={(val) => action(+val[0])}
            />
        </div>
    );
};
export default CagrFormField;
