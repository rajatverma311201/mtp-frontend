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

import { cagrCalc } from "./cagrUtils";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CagrFormField from "./CagrFormField";

("use client");

const formSchema = z.object({
    presentValue: z.number().int().min(0),
    futureValue: z.number().int().min(0),
    years: z.number().int().min(1),
});

function CagrComp() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            presentValue: 1000,
            futureValue: 1000,
            years: 1,
        },
    });

    const [cagrValue, setCagrValue] = useState(
        cagrCalc(
            form.getValues().presentValue,
            form.getValues().futureValue,
            form.getValues().years,
        ),
    );

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setCagrValue(cagrCalc(data.presentValue, data.futureValue, data.years));
    };

    return (
        <div className="flex justify-center">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">
                        Calculate Cagr
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            <CagrFormField
                                form={form}
                                name="presentValue"
                                label="Present Value"
                                description="The amount you have today."
                            />

                            <FormField
                                control={form.control}
                                name="futureValue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Future Value</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder=""
                                                value={field.value}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseInt(
                                                            e.target.value,
                                                        ),
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The amount you expect in future.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="years"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Years</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder=""
                                                value={field.value}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseInt(
                                                            e.target.value,
                                                        ),
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The number of years you expect to
                                            hold the investment.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex w-full justify-center">
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full items-center justify-center gap-2 rounded-md bg-accent px-10 py-4 text-center font-semibold text-accent-foreground">
                        <span>Cagr Value</span>-
                        <span className="text-xl text-primary">
                            {(cagrValue * 100).toFixed(2)} %
                        </span>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

export default CagrComp;
