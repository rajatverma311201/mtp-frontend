import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
type Action = {
    type: string;
    payload: number;
};
type CagrFormFieldProps = {
    label: string;
    val: number;
    dispatch: (value: Action) => void;
    action: string;
};

const CagrFormField = ({
    label,
    val,
    dispatch,
    action,
}: CagrFormFieldProps) => {
    return (
        <>
            <div className="flex flex-col gap-8 mb-10">
                <div className=" flex gap-10 justify-between items-center">
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
                        onChange={(e) =>
                            dispatch({ type: action, payload: +e.target.value })
                        }
                    />
                </div>
                <Slider
                    min={label === "Years" ? 1 : 1000}
                    max={label === "Years" ? 100 : 1000_000}
                    onValueChange={(val) => {
                        dispatch({ type: action, payload: val[0] });
                    }}
                />
            </div>
        </>
    );
};
export default CagrFormField;
