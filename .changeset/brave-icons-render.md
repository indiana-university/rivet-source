---
"@rivet-iu/core": minor
"@rivet-iu/tokens": minor
---

Generate favicons from graphic tokens and ship `favicon.ico`, `apple-touch-icon.png` and `favicon.svg` in the core dist output. The `.ico` carries 16, 32 and 48px drawings authored for each size, so register it rather than an SVG favicon: a browser renders an SVG at whatever size it likes, which discards the pixel-hinted artwork.
