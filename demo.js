import { palette, variants, rgba } from "./palette.js";
import { contrast as calcContrast } from "./contrast.js";

const opts = {
  minContrast: +document.querySelector("#min-contrast").value,
  darkIcon: "🌒",
  lightIcon: "☀️",
};
const { stringify } = JSON;
const jsonEqual = (a, b) => stringify(a) === stringify(b);
const render = ({
  main,
  document,
  minContrast = opts.minContrast,
  colorScheme = document.querySelector(":root").hasAttribute("dark")
    ? "dark"
    : "light",
  colorOpacity = 1,
  backgroundOpacity = 1,
} = {}) => {
  if (colorScheme === "dark") {
    document.querySelector(":root").setAttribute("dark", "");
  } else {
    document.querySelector(":root").removeAttribute("dark");
  }

  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  const colors = new Map([...palette, ...variants]);
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

const colorSchemeToggleIcon = document.querySelector("#color-scheme-icon");

colorSchemeToggleIcon.addEventListener("click", (e) => {
  const root = document.querySelector(":root");
  const next = root.hasAttribute("dark") ? "light" : "dark";
  if (next === "dark") {
    root.setAttribute("dark", "");
  } else {
    root.removeAttribute("dark");
  }
  e.currentTarget.textContent = colorSchemeIcon(next);
});

const { darkIcon, lightIcon, minContrast } = opts;
const colorSchemeIcon = (mode) => (mode === "dark" ? darkIcon : lightIcon);
const darkScheme = window.matchMedia("(prefers-color-scheme: dark)");

darkScheme.addListener(({ matches }) => {
  const colorScheme = matches === true ? "dark" : "light";
  const icon = colorSchemeIcon(colorScheme);
  document.querySelector("#color-scheme-icon").textContent = icon;
  render({ main, colorScheme, document });
  // todo change<meta name="theme-color"> that determines the color of the URL bar in Chrome
});
const colorScheme = darkScheme.matches ? "dark" : "light";
colorSchemeToggleIcon.textContent = colorSchemeIcon(colorScheme);
render({ main, minContrast, colorScheme, document });
