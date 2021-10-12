# reibo-palette

Akvaplan-niva web colors, developed in cooperation with [Reibo](https://reibo.no) in 2021.

Demo: https://reibo-palette.vercel.app/

## Init

Copy the `:root` block below into a head `<style>`:

```css
:root {
  --apn-white: 255, 255, 255;
  --apn-blue: 21, 120, 158;
  --apn-green: 16, 125, 140;
  --apn-cyan: 46, 196, 255;
  --apn-red: 215, 62, 15;
  --apn-yellow: 254, 206, 6;
  --apn-black: 29, 27, 23;
  --apn-blue-darker: 0, 83, 159;
  --apn-green-lighter: 0, 162, 178;
  --apn-blue-logo: 0, 73, 150;
  --apn-green-logo: 0, 149, 173;
}
```

Alternatively, inject the `--apn` palette variables via JavaScript.

```js
import { setCSSVariables, palette, variants } from "@akvaplan/reibo-palette";
const root = document.querySelector(":root");
setCSSVariables(el, palette);
setCSSVariables(el, variants);
```

### Use

To use the `--apn` palette, pass the variables to CSS's [`rgb()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb/rgba) functional notation.

```css
a {
  color: rgb(var(--apn-blue));
}
```
