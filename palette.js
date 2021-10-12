export const rgbfromhex = (hex) =>
  hex
    .replace("#", "")
    .match(/.{1,2}/g)
    .map((s) => parseInt(s, 16));

export const hexfromrgb = ([r, g, b]) =>
  [r, g, b].map((c) => c.toString(16)).join("");

export const black = [29, 27, 23];
export const blue = [21, 120, 158];
export const green = [16, 125, 140];
export const cyan = [46, 196, 255];
export const red = [215, 62, 15]; // Material Red A 700 Dark: [227, 80, 48];
export const yellow = [254, 206, 6];
export const white = [255, 255, 255];

// These are taken from background colors in Reibo's profile guide (PDF)
export const blueDarker = [0, 83, 159]; // Pantone Reflex Blue: [0, 83, 146]
export const greenLighter = [0, 162, 178];

// @todo ? blueLighter greenDarker
//export const blueLighter = rgbfromhex("4c7fc3");
//export const greenDarker = rgbfromhex("00505f");

// Logo colors
export const blueLogo = [0, 73, 150]; // #004996
export const greenLogo = [0, 149, 173]; // #0095ad

export const palette = new Map([
  ["--apn-white", white],
  ["--apn-blue", blue],
  ["--apn-green", green],
  ["--apn-cyan", cyan],
  ["--apn-red", red],
  ["--apn-yellow", yellow],
  ["--apn-black", black],
]);

export const variants = new Map([
  //["--apn-blue-lighter", blueLighter],
  ["--apn-blue-darker", blueDarker],
  //["--apn-green-darker", greenDarker],
  ["--apn-green-lighter", greenLighter],
  ["--apn-blue-logo", blueLogo],
  ["--apn-green-logo", greenLogo],
]);

export const rgba = ([r, g, b, a], opacity = 1) =>
  `rgba(${[r, g, b, a ?? opacity ?? 1]})`;

export const rgb = (rgb) => rgba(rgb);

const setCSSVariables = (el, map) => {
  for (const [k, v] of map) {
    el.style.setProperty(k, v);
  }
};

export const init = (el) => {
  setCSSVariables(el, palette);
  setCSSVariables(el, variants);
};
