# `@rivet-iu/core`

CSS and JavaScript for Rivet components.

## Favicons

Rivet ships IU-branded favicons, generated from the `graphic` design tokens in
`@rivet-iu/tokens`. Three files are published in `dist`:

| File                   | Size       | Purpose                             |
| ---------------------- | ---------- | ----------------------------------- |
| `favicon.ico`          | 16, 32, 48 | The browser tab icon                |
| `apple-touch-icon.png` | 180px      | Home screen icon for iOS and iPadOS |
| `favicon.svg`          | scalable   | For the mark drawn larger than 48px |

### Usage

Serve `favicon.ico` and `apple-touch-icon.png` from your site root, then
reference them in `<head>`. Two files, two tags.

```html
<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

Keep `favicon.ico` at the site root regardless of where anything else lives.
Browsers and tools such as feed readers request `/favicon.ico` directly, without
reading your markup.

Copy the files into your site root as part of your build. For example:

```shell
cp node_modules/@rivet-iu/core/dist/favicon.ico public/
cp node_modules/@rivet-iu/core/dist/apple-touch-icon.png public/
```

If you cannot serve from the root, point each `href` at wherever the files are
published instead, and keep `/favicon.ico` as a root-level copy.

### Why the SVG is not registered as the tab icon

A tab reserves a 16pt slot, which is 16 real pixels on a standard display, 32 on
most modern screens and 48 on the densest. The trident cannot simply be scaled
down to those sizes: its edges stop landing on whole pixels and the browser
blends each one across two, which at 16px turns the mark to mush.

So `favicon.ico` is not one image. It is a container holding **three separate
drawings**, each authored for its own pixel grid, and the browser takes whichever
fits. The 16 and 32 are hand-hinted for exactly this reason.

A browser renders an SVG favicon at whatever size it likes. Registering one would
mean the single scalable drawing is scaled to 16px, discarding the drawing made
for that size. Measured on these files, that is three times as many blended
pixels at 16px as the hinted version. So the `.ico` is registered on its own, and
every browser — Safari included — gets artwork drawn for the size it needs.

`favicon.svg` is still published, and is the right file wherever the mark is
drawn large enough that pixel hinting stops mattering. It just should not be the
tab icon.
