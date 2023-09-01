import { useEffect, useReducer } from "react";

import {
    RESET,
    SET_CAGR,
    SET_FUTURE_VALUE,
    SET_PRESENT_VALUE,
    SET_YEARS,
} from "./constants";

import { Cagr, Reducer } from "types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CagrFormField from "./CagrFormField";

const initialState = {
    presentValue: 1000,
    futureValue: 1000,
    years: 1,
    cagr: 0,
};

type Action = {
    type: string;
    payload?: number;
};

const reducer = (state: Cagr, action: Action): Cagr => {
    const type = action.type;
    if (type === RESET) return { ...initialState };

    const payload = action.payload ? +action.payload : 0;

    if ((isNaN(payload) || payload <= 0) && type !== SET_CAGR) return state;

    switch (type) {
        case SET_PRESENT_VALUE:
            return { ...state, presentValue: payload };

        case SET_FUTURE_VALUE:
            return { ...state, futureValue: payload };

        case SET_YEARS:
            return { ...state, years: payload };

        case SET_CAGR:
            return { ...state, cagr: payload };

        default:
            return state;
    }
};

export function CagrComp() {
    const [{ presentValue, futureValue, years, cagr }, dispatch] = useReducer<
        Reducer<Cagr, Action>
    >(reducer, initialState);

    useEffect(() => {
        const cagrCalculated =
            Math.pow(+futureValue / +presentValue, 1 / years) - 1;

        // console.log(cagrCalculated);

        dispatch({ type: SET_CAGR, payload: cagrCalculated });
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
                            action={SET_PRESENT_VALUE}
                            dispatch={dispatch}
                            val={presentValue}
                        />

                        <CagrFormField
                            label="Future Value"
                            dispatch={dispatch}
                            action={SET_FUTURE_VALUE}
                            val={futureValue}
                        />

                        <CagrFormField
                            label="Years"
                            dispatch={dispatch}
                            action={SET_YEARS}
                            val={years}
                        />

                        <div className="flex items-stretch justify-between pt-5 ">
                            <p className="flex items-center justify-center rounded-md bg-slate-900 px-10 text-white">
                                CAGR {"  "}
                                {(cagr * 100).toFixed(2)}%
                            </p>
                            <Button
                                variant={"destructive"}
                                onClick={() => dispatch({ type: RESET })}
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
