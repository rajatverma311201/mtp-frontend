import {
    RESET,
    SET_CAGR,
    SET_FUTURE_VALUE,
    SET_PRESENT_VALUE,
    SET_YEARS,
} from "./constants";

/**
 * Calculates the CAGR (Compound Annual Growth Rate) value based on the present value, future value and number of years
 * @param {number} pVal  present value
 * @param {number} fVal  future value
 * @param {number}  years number of years
 * @returns {number} cagr value
 */
export const cagrCalc = (pVal: number, fVal: number, years: number): number =>
    Math.pow(fVal / pVal, 1 / years) - 1;

export type CagrState = {
    presentValue: number;
    futureValue: number;
    years: number;
    cagr: number;
};

export type CagrAction = {
    type: string;
    payload?: number;
};

export const initialState: CagrState = {
    presentValue: 1000,
    futureValue: 1000,
    years: 1,
    cagr: 0,
};

export const setYears = (years: number): CagrAction => ({
    type: SET_YEARS,
    payload: years,
});

export const setPresentValue = (presentValue: number): CagrAction => ({
    type: SET_PRESENT_VALUE,
    payload: presentValue,
});

export const setFutureValue = (futureValue: number): CagrAction => ({
    type: SET_FUTURE_VALUE,
    payload: futureValue,
});

export const setCagr = (cagr: number): CagrAction => ({
    type: SET_CAGR,
    payload: cagr,
});

export const reset = (): CagrAction => ({
    type: RESET,
});

export const reducer = (state: CagrState, action: CagrAction): CagrState => {
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
