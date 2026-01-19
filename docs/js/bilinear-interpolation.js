"use strict";

(function () {
  class BilinearInterpolation extends HTMLElement {
    static get observedAttributes() {
      return ["x1", "x2", "y1", "y2", "q11", "q21", "q12", "q22", "x", "y"];
    }

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.inputs = {};
    }

    connectedCallback() {
      this.render();
      this.calculate();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (this.inputs[name] && this.inputs[name].value !== newValue) {
        this.inputs[name].value = newValue;
        this.calculate();
      }
    }

    renderInput(name) {
      const input = document.createElement("input");
      input.type = "number";
      input.step = "any";
      input.value = this.getAttribute(name) ?? "";

      input.addEventListener("input", () => {
        this.setAttribute(name, input.value);
        this.calculate();
      });

      this.inputs[name] = input;
      return input;
    }

    wrap(tag, name) {
      const cell = document.createElement(tag);
      cell.appendChild(this.renderInput(name));
      return cell;
    }

    render() {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            font-family: inherit;
            font-size: 0.95em;
          }

          .layout {
            display: flex;
            align-items: stretch;
            gap: 0.75em;
            flex-wrap: wrap;
          }

          table {
            border-collapse: collapse;
          }

          th, td {
            border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
            padding: 0.4em 0.5em;
            text-align: center;
          }

          th {
            font-weight: 600;
          }

          input {
            width: 4.5em;
            font: inherit;
            text-align: center;
            border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
            border-radius: 4px;
            padding: 0.15em 0.25em;
            background: transparent;
            color: inherit;
          }

          input:focus {
            outline: none;
            border-color: currentColor;
          }

          .divider {
            width: 1px;
            background: color-mix(in srgb, currentColor 25%, transparent);
          }

          .xy {
            display: flex;
            align-items: center;
            gap: 0.4em;
            font-weight: 500;
            padding: 0 0.5em;
            white-space: nowrap;
          }

          output {
            font-weight: 600;
            padding-left: 0.2em;
          }
        </style>
      `;

      const layout = document.createElement("div");
      layout.className = "layout";
      layout.style.marginBottom = "1rem";

      const table = document.createElement("table");

      const header = document.createElement("tr");
      header.appendChild(document.createElement("th"));
      header.appendChild(this.wrap("th", "x1"));
      header.appendChild(this.wrap("th", "x2"));
      table.appendChild(header);

      const rowY1 = document.createElement("tr");
      rowY1.appendChild(this.wrap("th", "y1"));
      rowY1.appendChild(this.wrap("td", "q11"));
      rowY1.appendChild(this.wrap("td", "q21"));
      table.appendChild(rowY1);

      const rowY2 = document.createElement("tr");
      rowY2.appendChild(this.wrap("th", "y2"));
      rowY2.appendChild(this.wrap("td", "q12"));
      rowY2.appendChild(this.wrap("td", "q22"));
      table.appendChild(rowY2);

      const divider = document.createElement("div");
      divider.className = "divider";

      const xy = document.createElement("div");
      xy.className = "xy";
      xy.appendChild(this.renderInput("x"));
      xy.appendChild(document.createTextNode("/"));
      xy.appendChild(this.renderInput("y"));
      xy.appendChild(document.createTextNode("="));
      this.resultEl = document.createElement("output");
      xy.appendChild(this.resultEl);

      layout.appendChild(table);
      layout.appendChild(divider);
      layout.appendChild(xy);

      this.shadowRoot.appendChild(layout);
    }

    getValue(name) {
      const v = parseFloat(this.getAttribute(name));
      return Number.isFinite(v) ? v : null;
    }

    calculate() {
      const x1 = this.getValue("x1");
      const x2 = this.getValue("x2");
      const y1 = this.getValue("y1");
      const y2 = this.getValue("y2");
      const q11 = this.getValue("q11");
      const q21 = this.getValue("q21");
      const q12 = this.getValue("q12");
      const q22 = this.getValue("q22");
      const x = this.getValue("x");
      const y = this.getValue("y");

      if ([x1, x2, y1, y2, q11, q21, q12, q22, x, y].includes(null)) {
        this.resultEl.textContent = "—";
        return;
      }

      const denom = (x2 - x1) * (y2 - y1);
      if (denom === 0) {
        this.resultEl.textContent = "Invalid";
        return;
      }

      const result =
        (q11 * (x2 - x) * (y2 - y) +
          q21 * (x - x1) * (y2 - y) +
          q12 * (x2 - x) * (y - y1) +
          q22 * (x - x1) * (y - y1)) /
        denom;

      this.resultEl.textContent = result.toFixed(2) + " AFR";
    }
  }

  customElements.define("bilinear-interpolation", BilinearInterpolation);
})();
