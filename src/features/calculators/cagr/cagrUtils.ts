/**
 * Calculates the CAGR (Compound Annual Growth Rate) value based on the present value, future value and number of years
 * @param {number} pVal  present value
 * @param {number} fVal  future value
 * @param {number}  years number of years
 * @returns {number} cagr value
 */
export const cagrCalc = (pVal: number, fVal: number, years: number): number =>
    Math.pow(fVal / pVal, 1 / years) - 1;
