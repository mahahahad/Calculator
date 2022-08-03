import { expressions, UPBs, LWBs } from "./piecewise.js";

function differentiate(value) {
  let currentExp = 0;
  let x;
  let delta = 0.000000001;

  // Check if user value lies within lower and upper bounds
  // If it does, evalute everything at current expression
  for (let i = 0; i <= expressions.length; i++) {
    if (LWBs[i] <= value && UPBs[i] >= value) {
      currentExp = i;
    }
  }

  x = value;
  let val1 = eval(expressions[currentExp]);

  x = value + delta;

  let val2 = eval(expressions[currentExp]);

  return parseFloat(((val2 - val1) / delta).toFixed(5));
}
console.log(differentiate(2.3));

export { differentiate };
