// Gets the limit of a piecewise function(x) as x approaches a value

function getLimit(expressions, UPBs, LWBs, value) {
  let x;
  let delta = 0.0000000001;

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

  let currentexp;

  for (let i = 0; i <= expressions.length; i++) {
    if (LWBs[i] <= value && UPBs[i] >= value) {
      currentexp = i;
    }
  }

  if (isNaN(eval(expressions[currentexp]))) {
    x = value + delta;

    let value1 = eval(expressions[currentexp]);

    x = value - delta;

    let value2 = eval(expressions[currentexp]);

    if (Math.abs(value2 - value1) <= delta) {
      return value2;
    }
  }

  if (value != LWBs[currentexp] && value != UPBs[currentexp]) {
    x = value;
    return eval(expressions[currentexp]);
  }
}

export { getLimit };
