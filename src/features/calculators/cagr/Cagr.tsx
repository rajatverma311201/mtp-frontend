import { useEffect, useReducer } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import CagrFormField from "./CagrFormField";

import {
    initialState,
    reducer as cagrReducer,
    reset,
    setCagr,
    setFutureValue,
    setPresentValue,
    setYears,
    cagrCalc,
} from "./cagrUtils";

export function CagrComp() {
    // const [{ presentValue, futureValue, years, cagr }, dispatch] = useReducer<
    //     Reducer<CagrState, CagrAction>
    // >(cagrReducer, initialState);

    const [{ presentValue, futureValue, years, cagr }, dispatch] = useReducer(
        cagrReducer,
        initialState,
    );

    useEffect(() => {
        const cagrCalculated = cagrCalc(+presentValue, +futureValue, +years);

        dispatch(setCagr(cagrCalculated));
    }, [futureValue, presentValue, years]);

    return (
        <div className="flex justify-center">
            <Card className="max-w-2xl flex-1">
                <CardHeader>
                    <CardTitle>CAGR Calculator</CardTitle>
                    <CardDescription>
                        Calculate the Compound Annual Growth Rate (CAGR) of an
                        investment
                    </CardDescription>
                </CardHeader>
                <CardContent className="">
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="space-y-5"
                    >
                        <CagrFormField
                            label="Present Value"
                            action={(val: number) =>
                                dispatch(setPresentValue(val))
                            }
                            val={presentValue}
                        />

                        <CagrFormField
                            label="Future Value"
                            action={(val: number) =>
                                dispatch(setFutureValue(val))
                            }
                            val={futureValue}
                        />

                        <CagrFormField
                            label="Years"
                            action={(val: number) => dispatch(setYears(val))}
                            val={years}
                        />

                        <div className="flex items-stretch justify-between pt-5 ">
                            <p className="flex items-center justify-center rounded-md bg-slate-900 px-10 text-white">
                                CAGR {"  "}
                                {(cagr * 100).toFixed(2)}%
                            </p>
                            <Button
                                variant={"destructive"}
                                onClick={() => dispatch(reset())}
                            >
                                Reset
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default CagrComp;
