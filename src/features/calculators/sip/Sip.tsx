import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import SipFormField from "./SipFormField";
import { sipCalc } from "./sipUtils";

const formSchema = z.object({
    monthlyInvestment: z.number().int().min(0),
    expectedReturnRate: z.number().int().min(0),
    years: z.number().int().min(1),
});

function SipComp() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            monthlyInvestment: 1000,
            expectedReturnRate: 10,
            years: 1,
        },
    });

    const [sipValue, setSipValue] = useState(
        sipCalc(
            form.getValues().monthlyInvestment,
            form.getValues().expectedReturnRate,
            form.getValues().years,
        ),
    );

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setSipValue(
            sipCalc(
                data.monthlyInvestment,
                data.expectedReturnRate,
                data.years,
            ),
        );
    };

    return (
        <div className="flex justify-center">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">Calculate Sip</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            <SipFormField
                                form={form}
                                name="monthlyInvestment"
                                label="Monthly Investment"
                                description="The amount you have today."
                            />

                            <SipFormField
                                form={form}
                                name="expectedReturnRate"
                                label="Expected Return Rate %"
                                description="The expected return rate."
                            />

                            <SipFormField
                                form={form}
                                name="years"
                                label="Years"
                                description="The number of years you expect to hold the investment."
                            />

                            <div className="flex w-full justify-center">
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full items-center justify-center gap-2 rounded-md bg-accent px-10 py-4 text-center font-semibold text-accent-foreground">
                        <div className="flex flex-1 flex-col items-center">
                            <span>Maturity Amount</span>
                            <span className="text-xl text-primary">
                                {sipValue.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex flex-1 flex-col items-center">
                            <span>Interest </span>
                            <span className="text-xl text-primary">
                                {(
                                    +sipValue.toFixed(2) -
                                    form.getValues().monthlyInvestment *
                                        form.getValues().years *
                                        12
                                ).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

export default SipComp;
