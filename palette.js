const rgbfromhex = (hex) => hex.match(/.{1,2}/g).map((s) => parseInt(s, 16));
// --apn-black: #1d1b17;
// --apn-blue: #005392;
// --apn-green: #107d8c;
// --apn-cyan: #15789e;
// --apn-red: #d73e0f;
// --apn-yellow: #fece06;

export const white = [255, 255, 255];
export const blue = [21, 120, 158];
export const green = [16, 125, 140];
export const cyan = [46, 196, 255];
export const red = rgbfromhex("cc1103"); // Material Red A 700 Dark – Reibo red (orangish): [227, 80, 48];
export const yellow = [255, 206, 12];
export const black = [35, 31, 32];

// These are from injecting blue/green into https://material.io/resources/color,
// except blue-darker from Reibo (Pantone Reflex Blue)
export const blueLighter = rgbfromhex("4c7fc3");
export const blueDarker = [0, 83, 146]; //rgbfromhex("002b64");
export const greenDarker = rgbfromhex("00505f");
export const greenLighter = rgbfromhex("52acbc");

export const palette = new Map([
  ["--apn-white", white],
  ["--apn-blue", blue],
  ["--apn-green", green],
  ["--apn-cyan", cyan],
  ["--apn-red", red],
  //["--apn-yellow", yellow],
  ["--apn-black", black],
]);

export const variants = new Map([
  ["--apn-blue-lighter", blueLighter],
  ["--apn-blue-darker", blueDarker],
  ["--apn-green-darker", greenDarker],
  ["--apn-green-lighter", greenLighter],
]);

export const light = new Map([
  ["--apn-primary", green],
  ["--apn-secondary", blue],
]);

export const dark = new Map([
  ["--apn-primary", green],
  ["--apn-secondary", blue],
]);

export const rgba = ([r, g, b, a], opacity = 1) =>
  `rgba(${[r, g, b, a ?? opacity ?? 1]})`;

// export const primary = (mode) => blue;
// export const secondary = (mode) => green;
// if (colorScheme === "dark") {
//   document.querySelector(":root").setAttribute("dark", "");
// } else {
//   document.querySelector(":root").removeAttribute("dark");
// }
