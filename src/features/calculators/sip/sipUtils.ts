export const sipCalc = (P: number, _r: number, _t: number) => {
    // Convert annual interest rate to decimal

    // Default to monthly compounding if not specified
    // const n = 12;
    // Default to 1 year if not specified

    const i = _r / (100 * 12);
    const n = _t * 12;
    console.log(P, i, n);
    const a = ((Math.pow(1 + i, n) - 1) / i) * (i + 1);

    return P * a;
};
