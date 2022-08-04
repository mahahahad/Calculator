// Sets up a piecewise function

/*
Parameters:
  - Expression
  - Lower Bound
  - Upper Bound
*/

// Array containing all user expressions
let expressions = ["x**3", "x**2", "1/x"]; // ["x**2", "x+x", "x**x"]
// Array containing the respective lower boundaries
let LWBs = [-Infinity, 7, 12]; //[-2, -1 , 0]
// Array containing the respective upper boundaries
let UPBs = [5, 11, Infinity]; //[2 , 4, 6]

// expected output is 1
// console.log(getLimit(expressions, UPBs, LWBs, 4.5));

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
