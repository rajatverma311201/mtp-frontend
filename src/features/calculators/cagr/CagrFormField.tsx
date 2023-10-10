import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

type CagrFormFieldProps = {
    form: UseFormReturn<{
        presentValue: number;
        futureValue: number;
        years: number;
    }>;
    label: string;
    name: "presentValue" | "futureValue" | "years";
    description: string;
};

const CagrFormField: React.FC<CagrFormFieldProps> = ({
    form,
    label,
    name,
    description,
}) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            type="number"
                            placeholder=""
                            value={field.value}
                            onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                            }
                        />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
export default CagrFormField;
