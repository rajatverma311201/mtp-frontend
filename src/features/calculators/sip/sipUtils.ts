/**
 * Calculates the SIP value based on the
 * @param {number} pVal  present value
 * @param {number} fVal  future value
 * @param {number}  years number of years
 * @returns {number} sip value
 */
export const sipCalc = (pVal: number, fVal: number, years: number): number =>
    Math.pow(fVal / pVal, 1 / years) - 1;
