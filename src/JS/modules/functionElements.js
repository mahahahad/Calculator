class LowerBound extends HTMLInputElement {
  constructor() {
    super();
  }
}

// validation to make sure next expressions lower bound
// doesnt subceed previous expressions upper bound for each element
customElements.define("lower-bound", LowerBound, { extends: "input" });

// export { customElements };
