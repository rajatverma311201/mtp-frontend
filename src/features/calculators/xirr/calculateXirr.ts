import moment from "moment";

// Set maximum epsilon for end of iteration
const epsMax = 1e-10;

// Set maximum number of iterations
const iterMax = 50;

/**
 *
 * @param values list of amounts
 * @param dates list of dates
 * @param guess guess value
 * @returns xirr
 */
export default function calculateXirr(
    values: number[],
    dates: (moment.Moment | undefined)[],
    guess = 0.1,
): number | string {
    // Check that values contains at least one positive value and one negative value
    let positive = false;
    let negative = false;
    for (let i = 0; i < values.length; i++) {
        if (values[i] > 0) positive = true;
        if (values[i] < 0) negative = true;
    }

    // Return error if values does not contain at least one positive value and one negative value
    if (!positive || !negative) return "#NUM!";

    // Initialize guess and resultRate
    let resultRate = guess;

    // Implement Newton's method
    let newRate, epsRate, resultValue;
    let iteration = 0;
    let contLoop = true;
    do {
        resultValue = irrResult(values, dates, resultRate);
        newRate =
            resultRate -
            resultValue / irrResultDeriv(values, dates, resultRate);
        epsRate = Math.abs(newRate - resultRate);
        resultRate = newRate;
        contLoop = epsRate > epsMax && Math.abs(resultValue) > epsMax;
    } while (contLoop && ++iteration < iterMax);

    if (contLoop) return "#NUM!";

    // Return internal rate of return
    return resultRate;
}

// Calculates the resulting amount
const irrResult = function (
    values: number[],
    dates: (moment.Moment | undefined)[],
    rate: number,
) {
    const r = rate + 1;
    let result = values[0];
    for (let i = 1; i < values.length; i++) {
        result +=
            values[i] /
            Math.pow(r, moment(dates[i]).diff(moment(dates[0]), "days") / 365);
    }
    return result;
};

// Calculates the first derivation
const irrResultDeriv = function (
    values: number[],
    dates: (moment.Moment | undefined)[],
    rate: number,
) {
    const r = rate + 1;
    let result = 0;
    for (let i = 1; i < values.length; i++) {
        const frac = moment(dates[i]).diff(moment(dates[0]), "days") / 365;
        result -= (frac * values[i]) / Math.pow(r, frac + 1);
    }
    return result;
};
