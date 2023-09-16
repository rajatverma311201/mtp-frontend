import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import React, { useReducer } from "react";
import calculateXirr from "./calculateXirr";
import moment from "moment";
import {
    initialState,
    reducer,
    setAmount,
    setDate,
    setDates,
    setMaturityAmount,
    setMaturityDate,
    setValues,
    setXirr,
} from "./xirrUtils";
import { XIRR } from "@/utils/constants";
import useAddInvestment from "./useAddInvestment";

function Xirr() {
    const { addInvestment, isLoading } = useAddInvestment();

    const [
        { date, dates, amount, values, maturityAmount, maturityDate, xirr },
        dispatch,
    ] = useReducer(reducer, initialState);

    function handleAdd(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (date && amount) {
            dispatch(setDates([...dates, date]));
            dispatch(setValues([...values, +amount]));
            addInvestment({ amount, date: date as Date });
        }

        dispatch(setAmount(""));
        dispatch(setDate(undefined));
    }

    function calcXirr(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (maturityDate && maturityAmount) {
            const convertedDates = [...dates, maturityDate].map((d) => {
                const formattedDate = moment(d.toISOString()).format(
                    XIRR.DATE_FORMAT,
                );
                const convertedDate = moment(formattedDate, XIRR.DATE_FORMAT);
                return convertedDate;
            });

            dispatch(
                setXirr(
                    +calculateXirr(
                        [...values, +maturityAmount],
                        convertedDates,
                    ),
                ),
            );
        }
        dispatch(setMaturityAmount(""));
        dispatch(setMaturityDate(undefined));
    }

    return (
        <>
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                XIRR Calculator
            </h1>
            <form onSubmit={handleAdd}>
                <div className="flex ">
                    <Input
                        value={amount || ""}
                        onChange={(e) => dispatch(setAmount(e.target.value))}
                        type="number"
                        name="amount"
                        placeholder="Amount"
                    />
                    <DatePicker
                        date={date}
                        setDate={(d) => dispatch(setDate(d))}
                    />
                </div>

                <Button disabled={isLoading}>Submit</Button>
            </form>
            <form onSubmit={calcXirr}>
                <div className="flex">
                    <Input
                        value={maturityAmount || ""}
                        onChange={(e) =>
                            dispatch(setMaturityAmount(+e.target.value))
                        }
                        type="number"
                        placeholder="Maturity Amount"
                        name="maturityAmount"
                    />
                    <DatePicker
                        date={maturityDate}
                        setDate={(d) => dispatch(setMaturityDate(d))}
                    />
                </div>
                <Button>Calculate</Button>
            </form>
            {(xirr * 100).toFixed(2)}%
        </>
    );
}

export default Xirr;
