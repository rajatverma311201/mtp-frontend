import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import React, { useEffect, useReducer } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { Calculator } from "@/services/api";
import { XirrTransaction } from "types";
import InvestmentTable from "./InvestmentTable";
import { useAuthContext } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Xirr() {
    const { addInvestment, isLoading } = useAddInvestment();

    const authCtx = useAuthContext();
    const jwt = authCtx.jwt;

    const { data } = useQuery({
        queryKey: ["fetch-xirr"],
        queryFn: () => Calculator.getXirrInvestments(jwt),
        enabled: !!jwt,
    });

    const [
        { date, dates, amount, values, maturityAmount, maturityDate, xirr },
        dispatch,
    ] = useReducer(reducer, initialState);

    useEffect(() => {
        if (data && jwt) {
            const _dates: Date[] = [];
            const _values: number[] = [];

            data.data.forEach((item: XirrTransaction) => {
                _dates.push(new Date(+item.date));
                _values.push(+item.amount);
            });

            dispatch(setDates(_dates));
            dispatch(setValues(_values));
        }
    }, [data, jwt]);

    function handleAdd(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (date && amount) {
            if (!jwt) {
                dispatch(setDates([...dates, date]));
                dispatch(setValues([...values, +amount]));
            } else {
                addInvestment({ amount: +amount, date: date as Date });
            }
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
    }

    return (
        <>
            {/* <ModeToggle /> */}
            <div className=" flex">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center text-primary">
                            XIRR Calculator
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col gap-12 ">
                        <FormRow
                            onSubmit={handleAdd}
                            inputVal={amount || ""}
                            dateVal={date}
                            onInputChange={(e) =>
                                dispatch(setAmount(e.target.value))
                            }
                            onDateChange={(d) => dispatch(setDate(d))}
                            isLoading={isLoading}
                            btnText="Submit"
                        />

                        <FormRow
                            onSubmit={calcXirr}
                            inputVal={maturityAmount || ""}
                            dateVal={maturityDate}
                            onInputChange={(e) =>
                                dispatch(setMaturityAmount(+e.target.value))
                            }
                            onDateChange={(d) => dispatch(setMaturityDate(d))}
                            btnText="Calculate"
                        />

                        <p className="rounded-sm bg-accent py-5 text-center text-xl font-semibold">
                            {(xirr * 100).toFixed(2)}%
                        </p>
                    </CardContent>
                </Card>

                <div className="flex-1">
                    {<InvestmentTable dates={dates} values={values} />}
                </div>
            </div>
        </>
    );
}

type FormRowProps = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    inputVal: string | number | "";
    dateVal: Date | undefined;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDateChange: (d: Date | undefined) => void;
    btnText: string;
    isLoading?: boolean;
};

const FormRow = ({
    onSubmit,
    inputVal,
    dateVal,
    onInputChange,
    onDateChange,
    btnText,
    isLoading = false,
}: FormRowProps) => {
    return (
        <form className="flex flex-col items-center gap-5" onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-5">
                <Input
                    className=""
                    value={inputVal || ""}
                    onChange={onInputChange}
                    type="number"
                    name="amount"
                    placeholder="Amount"
                />
                <DatePicker date={dateVal} setDate={onDateChange} />
            </div>

            <Button disabled={isLoading}>{btnText}</Button>
        </form>
    );
};

export default Xirr;

/*
   <>
                            <Input
                                value={amount || ""}
                                onChange={(e) =>
                                    dispatch(setAmount(e.target.value))
                                }
                                type="number"
                                name="amount"
                                placeholder="Amount"
                                // className="w-"
                            />
                            <DatePicker
                                date={date}
                                setDate={(d) => dispatch(setDate(d))}
                            />
                            <Button disabled={isLoading}>Submit</Button>
                        </>
*/
