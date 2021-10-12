import { palette, variants, rgba, init, hexfromrgb } from "./palette.js";
import { contrast as calcContrast } from "./contrast.js";

const opts = {
  minContrast: +document.querySelector("#min-contrast").value,
};

const render = ({
  main,
  document,
  minContrast = opts.minContrast,
  colorOpacity = 1,
  backgroundOpacity = 1,
} = {}) => {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  const colors = new Map([...palette /*, ...variants*/]);
  for (const [bgname, bgarr] of colors) {
    for (const [colorname, colorarr] of colors) {
      const contrast = calcContrast(colorarr, bgarr);
      if (contrast >= minContrast && bgname !== colorname) {
        const el = document.createElement("li");

        const c = colorname;
        const b = bgname;
        main.appendChild(el);

        el.textContent = `${c} on ${b} [contrast: ${contrast.toPrecision(
          2
        )}] `.replace(/--/g, "");
        const color = rgba(colorarr, colorOpacity);
        const background = rgba(bgarr, backgroundOpacity);
        el.style.color = color;
        el.style.background = background;
        el.addEventListener("click", ({ currentTarget }) => {
          const root = currentTarget.getRootNode().querySelector(":root");
          root.style.setProperty("--apn-primary", background);
          root.style.setProperty("--apn-on-primary", color);
          root.style.setProperty("--apn-secondary", background);
          root.style.setProperty("--apn-on-secondary", color);
        });
      }
    }
  }
};

const updatedFontSize = ({ selector, property, main }) => ({
  currentTarget: { value },
}) => {
  const num = document.querySelector(selector);
  num.textContent = value;
  main.style.fontSize = `${value}px`;
};

const updatedMinContrast = ({ selector, property, main }) => ({
  currentTarget: { value },
}) => {
  const num = document.querySelector(selector);
  num.textContent = value;
  render({ document, main, [property]: value });
};

const main = document.querySelector("main > ul");
document.querySelector("#font-size").addEventListener(
  "input",
  updatedFontSize({
    selector: `label[for="font-size"] > span`,
    property: "fontSize",
    main,
  })
);

document.querySelector("#min-contrast").addEventListener(
  "input",
  updatedMinContrast({
    selector: `label[for="min-contrast"] > span`,
    property: "minContrast",
    main,
  })
);

const logCssVarMap = (map) => {
  let s = [":root {"];
  for (const [k, v] of map) {
    s.push(`  ${k}: ${v};`);
  }
  s.push("}");
  console.log(s.join("\n"));
};

logCssVarMap([...palette, ...variants]);
init(document.querySelector(":root"));
render({ main, document, ...opts });
