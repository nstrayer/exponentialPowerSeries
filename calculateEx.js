// Calculates e^x using the series expression.

export const seq = (n, start = 1) => Array.from(new Array(n), (d,i) => i + start);

const factorial = (x) => seq(x).reduce((prod, cur) => prod * cur, 1);

export const calcStep = (x, i) => Math.pow(x,i) / factorial(i);

export const showSteps = (x, m) => seq(m, 0).map(d => calcStep(x,d));