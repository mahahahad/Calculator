(() => {
  var __webpack_modules__ = {
      657: () => {
        const KEYCODE = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 },
          numpadNumbers = document.querySelector(".numbers"),
          numpadOperators = document.querySelector(".operators");
        function onKeyDown(e, t) {
          return function (r) {
            switch (r.keyCode) {
              case KEYCODE.RIGHT:
                r.preventDefault(), focusNextItem(t);
                break;
              case KEYCODE.LEFT:
                r.preventDefault(), focusPreviousItem(t);
                break;
              case KEYCODE.UP:
                r.preventDefault(), focusAboveItem(e, t);
                break;
              case KEYCODE.DOWN:
                r.preventDefault(), focusBelowItem(e, t);
            }
          };
        }
        function onClick(e) {
          return function (t) {
            -1 !== Array.from(e.querySelectorAll("button")).indexOf(t.target) &&
              activate(t.target, e);
          };
        }
        function focusNextItem(e) {
          const t = document.activeElement;
          t.nextElementSibling && activate(t.nextElementSibling, e);
        }
        function focusPreviousItem(e) {
          const t = document.activeElement;
          t.previousElementSibling && activate(t.previousElementSibling, e);
        }
        function focusAboveItem(columns, array) {
          const item = document.activeElement;
          let itemAbove,
            i = 0;
          for (
            ;
            i <= columns &&
            ((itemAbove = "item" + ".previousElementSibling".repeat(i)),
            (itemAbove = eval(itemAbove)),
            null !== itemAbove);

          )
            i++;
          itemAbove && activate(itemAbove, array);
        }
        function focusBelowItem(columns, array) {
          const item = document.activeElement;
          let itemBelow,
            i = 0;
          for (
            ;
            i <= columns &&
            ((itemBelow = "item" + ".nextElementSibling".repeat(i)),
            (itemBelow = eval(itemBelow)),
            null !== itemBelow);

          )
            i++;
          itemBelow && activate(itemBelow, array);
        }
        function activate(e, t) {
          t.querySelectorAll("button").forEach((e) => (e.tabIndex = -1)),
            (e.tabIndex = 0),
            e.focus();
        }
        numpadNumbers.addEventListener("keydown", onKeyDown(3, numpadNumbers)),
          numpadOperators.addEventListener(
            "keydown",
            onKeyDown(2, numpadOperators)
          ),
          numpadNumbers.addEventListener("click", onClick(numpadNumbers)),
          numpadOperators.addEventListener("click", onClick(numpadOperators));
      },
    },
    __webpack_module_cache__ = {};
  function __webpack_require__(e) {
    var t = __webpack_module_cache__[e];
    if (void 0 !== t) return t.exports;
    var r = (__webpack_module_cache__[e] = { exports: {} });
    return __webpack_modules__[e](r, r.exports, __webpack_require__), r.exports;
  }
  var __webpack_exports__ = {};
  (() => {
    "use strict";
    let e = document.querySelector("#isDarkMode"),
      t = document.querySelector(".more"),
      r = document.querySelector(".numpad");
    document.querySelector(".menu"), document.querySelector(".fab");
    const o = document.querySelector(".result__active__text"),
      c = document.querySelector(".result__previous__text"),
      n = document.querySelectorAll(".calculator__number"),
      u = document.querySelector(".oper-multiply"),
      a = document.querySelector(".oper-divide"),
      i = document.querySelector(".oper-add"),
      l = document.querySelector(".oper-subtract"),
      s = document.querySelector(".oper-equal"),
      m = document.querySelector(".oper-ac"),
      d = document.querySelector(".oper-del"),
      p = [u, a, i, l];
    let b = new (class {
      constructor(e, t) {
        (this.currentNumberElement = e),
          (this.previousNumberElement = t),
          this.allClear();
      }
      allClear() {
        (this.currentNumber = ""),
          (this.previousNumber = ""),
          (this.operator = "");
      }
      deleteCharacter() {
        this.currentNumber = this.currentNumber.toString().slice(0, -1);
      }
      appendNumber(e) {
        ("." === e && this.currentNumber.includes(".")) ||
          (this.currentNumber += e.toString());
      }
      operatorPick(e) {
        "" !== this.currentNumber &&
          (this.previousNumber && this.evaluate(),
          (this.operator = e),
          (this.previousNumber = this.currentNumber + " " + e),
          (this.currentNumber = ""));
      }
      evaluate() {
        let e,
          t = parseFloat(this.previousNumber),
          r = parseFloat(this.currentNumber);
        if (!isNaN(t) && !isNaN(r)) {
          switch (this.operator) {
            case "×":
              e = t * r;
              break;
            case "÷":
              if (0 === r) return;
              e = t / r;
              break;
            case "+":
              e = t + r;
              break;
            case "-":
              e = t - r;
          }
          (this.currentNumber = e), (this.previousNumber = "");
        }
      }
      updateInterface() {
        (this.currentNumberElement.innerText = this.currentNumber),
          (this.previousNumberElement.innerText = this.previousNumber);
      }
    })(o, c);
    function h(e = "#111111", t = "hsl(312, 35%, 10%)", r = "#FFFFFF") {
      document.querySelector("html").style.setProperty("color-scheme", "dark"),
        document
          .querySelector("html")
          .style.setProperty("--color-background", e),
        document.querySelector("html").style.setProperty("--color-primary", t),
        document.querySelector("html").style.setProperty("--color-text", r);
    }
    function y(e = "#F9F9F9", t = "hsl(78, 87%, 80%)", r = "#000000") {
      document.querySelector("html").style.setProperty("color-scheme", "light"),
        document
          .querySelector("html")
          .style.setProperty("--color-background", e),
        document.querySelector("html").style.setProperty("--color-primary", t),
        document.querySelector("html").style.setProperty("--color-text", r);
    }
    n.forEach((e) => {
      e.onclick = function () {
        b.appendNumber(e.value), b.updateInterface();
      };
    }),
      (m.onclick = function () {
        b.allClear(), b.updateInterface();
      }),
      p.forEach((e) => {
        e.onclick = function () {
          b.operatorPick(e.value), b.updateInterface();
        };
      }),
      (s.onclick = function () {
        b.evaluate(), b.updateInterface();
      }),
      (d.onclick = function () {
        b.deleteCharacter(), b.updateInterface();
      }),
      document.addEventListener("keydown", (e) => {
        switch (e.key) {
          case "*":
            b.operatorPick("×"), b.updateInterface();
            break;
          case "/":
            b.operatorPick("÷"), b.updateInterface();
            break;
          case "+":
            b.operatorPick("+"), b.updateInterface();
            break;
          case "-":
            b.operatorPick("-"), b.updateInterface();
            break;
          case "Enter":
            b.evaluate(), b.updateInterface();
            break;
          case "Backspace":
            b.deleteCharacter(), b.updateInterface();
            break;
          default:
            if (isNaN(parseInt(e.key)) && "." != e.key) return;
            b.appendNumber(e.key), b.updateInterface();
        }
      }),
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? (h(), (e.checked = !0))
        : (y(), (e.checked = !1)),
      (window.matchMedia("(prefers-color-scheme: dark)").onchange =
        function () {
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? (h(), (e.checked = !0))
            : (y(), (e.checked = !1));
        }),
      (e.onclick = function () {
        !0 === e.checked ? h("#111", "hsl(312, 35%, 10%)") : y();
      }),
      __webpack_require__(657),
      t.addEventListener("click", function () {
        t.classList.toggle("expanded"),
          r.classList.toggle("condensed"),
          t.classList.contains("expanded")
            ? (e.setAttribute("tabIndex", "0"),
              (document.querySelector(".more__chevron-up").style.transform =
                "rotate(180deg)"))
            : (e.setAttribute("tabIndex", "-1"),
              (document.querySelector(".more__chevron-up").style.transform =
                "rotate(0deg)"));
      }),
      t.addEventListener("keypress", (e) => {
        "Enter" === e.key && t.click();
      });
  })();
})();
