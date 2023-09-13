import {
    SET_AMOUNT,
    SET_DATE,
    SET_DATES,
    SET_MATURITY_AMOUNT,
    SET_MATURITY_DATE,
    SET_VALUES,
    SET_XIRR,
} from "./constants";

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
    type: SET_DATE,
    payload: date,
});

export const setDates = (dates: Date[]): XirrAction => ({
    type: SET_DATES,
    payload: dates,
});

export const setAmount = (amount: number | string): XirrAction => ({
    type: SET_AMOUNT,
    payload: amount,
});

export const setValues = (values: number[]): XirrAction => ({
    type: SET_VALUES,
    payload: values,
});

export const setMaturityAmount = (
    maturityAmount: number | string,
): XirrAction => ({
    type: SET_MATURITY_AMOUNT,
    payload: maturityAmount,
});

export const setMaturityDate = (
    maturityDate: Date | undefined,
): XirrAction => ({
    type: SET_MATURITY_DATE,
    payload: maturityDate,
});

export const setXirr = (xirr: number): XirrAction => ({
    type: SET_XIRR,
    payload: xirr,
});

export const reducer = (state: XirrState, action: XirrAction): XirrState => {
    const type = action.type;
    const payload = action.payload;

    switch (type) {
        case SET_DATE:
            return { ...state, date: payload as Date };
        case SET_DATES:
            return { ...state, dates: payload as Date[] };
        case SET_AMOUNT:
            return { ...state, amount: payload as number };
        case SET_VALUES:
            return { ...state, values: payload as number[] };
        case SET_MATURITY_AMOUNT:
            return { ...state, maturityAmount: payload as number };
        case SET_MATURITY_DATE:
            return { ...state, maturityDate: payload as Date };
        case SET_XIRR:
            return { ...state, xirr: payload as number };

        default:
            return state;
    }
};
