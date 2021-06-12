// Code from https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors/9733420#9733420

// See also WCAG: [relative luminance](https://www.w3.org/TR/WCAG20/#relativeluminancedef):
// "the relative brightness of any point in a colorspace, normalized to 0 for darkest black and 1 for lightest white"
export function luminance([r, g, b]) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function contrast(rgb1, rgb2) {
  const lum1 = luminance(rgb1);
  const lum2 = luminance(rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}
