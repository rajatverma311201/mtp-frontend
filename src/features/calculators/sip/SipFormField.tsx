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

type SipFormFieldProps = {
    form: UseFormReturn<{
        monthlyInvestment: number;
        expectedReturnRate: number;
        years: number;
    }>;
    label: string;
    name: "monthlyInvestment" | "expectedReturnRate" | "years";
    description: string;
};

const SipFormField: React.FC<SipFormFieldProps> = ({
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
export default SipFormField;
