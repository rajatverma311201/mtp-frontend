import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import XIRR from "./calcXirr";
import moment from "moment";

function Xirr() {
    console.log("rerender");
    const [date, setDate] = useState<Date | undefined>();
    const [maturityDate, setMaturityDate] = useState<Date | undefined>();
    const [dates, setDates] = useState<Date[]>([]);
    const [values, setValues] = useState<number[]>([]);
    const [xirr, setXirr] = useState(0);

    function handleAdd(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const amt = +e.currentTarget.amount.value;
        console.log({ date, amt });
        if (date && amt) {
            setDates((d) => [...d, date]);
            setValues((v) => [...v, amt]);
        }

        e.currentTarget.amount.value = "";
        setDate(undefined);
    }

    function calcXirr(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const maturityAmt = +e.currentTarget.maturityAmt.value;

        if (maturityDate && maturityAmt) {
            const convertedDates = [...dates, maturityDate].map((d) => {
                const formattedDate = moment(d.toISOString()).format(
                    "YYYY/MM/DD",
                );
                const convertedDate = moment(formattedDate, "YYYY/MM/DD");
                return convertedDate;
            });

            setXirr(+XIRR([...values, maturityAmt], convertedDates));
        }
        e.currentTarget.maturityAmt.value = "";
        setMaturityDate(undefined);
    }

    return (
        <>
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                XIRR Calculator
            </h1>
            <form onSubmit={handleAdd}>
                <div className="flex ">
                    <Input type="number" name="amount" placeholder="Amount" />
                    <DatePicker date={date} setDate={setDate} />
                </div>
                <Button>Submit</Button>
            </form>
            {JSON.stringify({ dates, values })}
            <form onSubmit={calcXirr}>
                <div className="flex">
                    <Input
                        type="number"
                        placeholder="Maturity Amount"
                        name="maturityAmt"
                    />
                    <DatePicker date={maturityDate} setDate={setMaturityDate} />
                </div>
                <Button>Calculate</Button>
            </form>
            {(xirr * 100).toFixed(2)}%
        </>
    );
}

export default Xirr;
