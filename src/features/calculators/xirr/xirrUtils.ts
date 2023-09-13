import { XIRR } from "@/utils/constants";

type XirrState = {
    date: Date | undefined;
    dates: Date[];
    amount: number | string;
    values: number[];
    maturityAmount: number | string;
    maturityDate: Date | undefined;
    xirr: number;
};

type XirrAction = {
    type: string;
    payload?: Date | number | Date[] | number[] | string | undefined;
};

export const initialState: XirrState = {
    date: undefined,
    dates: [],
    amount: "",
    values: [],
    maturityAmount: "",
    maturityDate: undefined,
    xirr: 0,
};

export const setDate = (date: Date | undefined): XirrAction => ({
    type: XIRR.SET_DATE,
    payload: date,
});

export const setDates = (dates: Date[]): XirrAction => ({
    type: XIRR.SET_DATES,
    payload: dates,
});

export const setAmount = (amount: number | string): XirrAction => ({
    type: XIRR.SET_AMOUNT,
    payload: amount,
});

export const setValues = (values: number[]): XirrAction => ({
    type: XIRR.SET_VALUES,
    payload: values,
});

export const setMaturityAmount = (
    maturityAmount: number | string,
): XirrAction => ({
    type: XIRR.SET_MATURITY_AMOUNT,
    payload: maturityAmount,
});

export const setMaturityDate = (
    maturityDate: Date | undefined,
): XirrAction => ({
    type: XIRR.SET_MATURITY_DATE,
    payload: maturityDate,
});

export const setXirr = (xirr: number): XirrAction => ({
    type: XIRR.SET_XIRR,
    payload: xirr,
});

export const reducer = (state: XirrState, action: XirrAction): XirrState => {
    const type = action.type;
    const payload = action.payload;

    switch (type) {
        case XIRR.SET_DATE:
            return { ...state, date: payload as Date };
        case XIRR.SET_DATES:
            return { ...state, dates: payload as Date[] };
        case XIRR.SET_AMOUNT:
            return { ...state, amount: payload as number };
        case XIRR.SET_VALUES:
            return { ...state, values: payload as number[] };
        case XIRR.SET_MATURITY_AMOUNT:
            return { ...state, maturityAmount: payload as number };
        case XIRR.SET_MATURITY_DATE:
            return { ...state, maturityDate: payload as Date };
        case XIRR.SET_XIRR:
            return { ...state, xirr: payload as number };

        default:
            return state;
    }
};
