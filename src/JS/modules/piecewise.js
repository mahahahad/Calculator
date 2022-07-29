// Sets up a piecewise function

/*
Parameters:
  - Expression
  - Lower Bound
  - Upper Bound
*/

import { getLimit } from "./limit.js";

// Array containing all user expressions
let expressions = ["(x-5)/((x-5)*(x-4))"]; // ["x**2", "x+x", "x**x"]
// Array containing the respective upper boundaries
let UPBs = [2]; //[2 , 4, 6]
// Array containing the respective lower boundaries
let LWBs = [6]; //[-2, -1 , 0]

// expected output is 1
console.log(getLimit(expressions, UPBs, LWBs, 4.5));

function addToExps(exp) {
  expressions.push(exp);
}

function addToUPBs(upper) {
  UPBs.push(upper);
}

function addToLWBs(lower) {
  LWBs.push(lower);
}

export { expressions, LWBs, UPBs, addToExps, addToUPBs, addToLWBs };
