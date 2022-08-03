import { expressions, UPBs, LWBs } from "./piecewise.js";

function g_integrate(expression, l, u) {
  let area = 0;
  let n = 1000;
  let x;
  let w = (u - l) / n;

  for (let i = 0; i < n; i++) {
    x = l + i * w;
    let h1 = eval(expression);

    x = l + (i + 1) * w;
    let h2 = eval(expression);

    area += (1 / 2) * (h1 + h2) * w;
  }

  return parseFloat(area.toFixed(5));
}

function integrate(l, u) {
  let currentExp1 = 0;

  for (let i = 0; i <= expressions.length; i++) {
    if (LWBs[i] <= l && UPBs[i] >= l) {
      currentExp1 = i;
    }
  }

  let currentExp2 = 0;

  for (let i = 0; i <= expressions.length; i++) {
    if (LWBs[i] <= u && UPBs[i] >= u) {
      currentExp2 = i;
    }
  }

  let t_area = g_integrate(expressions[currentExp1], l, UPBs[currentExp1]);

  for (let i = currentExp1 + 1; i < currentExp2; i++) {
    t_area += g_integrate(expressions[i], LWBs[i], UPBs[i]);
  }

  t_area += g_integrate(expressions[currentExp2], LWBs[currentExp2], u);

  return t_area;
}

console.log(integrate(2, 10));

export { integrate };
