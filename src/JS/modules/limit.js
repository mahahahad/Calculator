// Gets the limit of a piecewise function(x) as x approaches a value

// import { expressions, UPBs, LWBs } from "./piecewise.js";
import { expressions, UPBs, LWBs } from "./piecewise";

function getLimit(value) {
  let x;
  let delta = 0.000000001;

  // return [expressions[0], UPBs[0], LWBs[0], value];

  if (value == -Infinity) {
    if (LWBs[0] == -Infinity) {
      x = -Infinity;
      return eval(expressions[0]);
    }
  }

  if (value == Infinity) {
    if (UPBs[UPBs.length] == Infinity) {
      x = Infinity;
      return eval(expressions[UPBs.length]);
    }
  }

  let currentExp = 0;

  // Check if user value lies within lower and upper bounds
  // If it does, evalute everything at current expression
  for (let i = 0; i <= expressions.length; i++) {
    if (LWBs[i] <= value && UPBs[i] >= value) {
      currentExp = i;
    }
  }

  if (isNaN(eval(expressions[currentExp]))) {
    x = value + delta;

    // let value1 = eval(expressions[currentExp]);
    let value1 = parseFloat(eval(expressions[currentExp]).toFixed(5));

    x = value - delta;

    // let value2 = eval(expressions[currentExp]);
    let value2 = parseFloat(eval(expressions[currentExp]).toFixed(5));

    // return `${value1} - ${value2} = ${value1 - value2}`;

    let pointDistance = Math.abs(value2 - value1);

    if (pointDistance <= delta) {
      return value2;
    } else {
      return "Limit DNE";
    }
  }

  if (value != LWBs[currentExp] && value != UPBs[currentExp]) {
    x = value;
    return eval(expressions[currentExp]);
  }
}

export { getLimit };
