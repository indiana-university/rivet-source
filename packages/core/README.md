# `@rivet-iu/core`

CSS and JavaScript for Rivet components.

## Favicons

Rivet ships IU-branded favicons, generated from the `graphic` design tokens in
`@rivet-iu/tokens`. Three files are published in `dist`:

| File                   | Size     | Purpose                             |
| ---------------------- | -------- | ----------------------------------- |
| `favicon.ico`          | 16-48px  | Fallback for older browsers         |
| `favicon.svg`          | scalable | Icon for modern browsers            |
| `apple-touch-icon.png` | 180px    | Home screen icon for iOS and iPadOS |

### Usage

Serve all three from your site root, then reference them in `<head>`.

```html
<link rel="icon" href="/favicon.ico" sizes="32x32" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

Browsers pick the best option they understand, so no other tags are needed.

Keep a copy of `favicon.ico` at the site root regardless of where the others
live. Browsers and tools such as feed readers request `/favicon.ico` directly,
without reading your markup.

Copy the files into your site root as part of your build. For example:

```shell
cp node_modules/@rivet-iu/core/dist/favicon.ico public/
cp node_modules/@rivet-iu/core/dist/favicon.svg public/
cp node_modules/@rivet-iu/core/dist/apple-touch-icon.png public/
```

If you cannot serve from the root, point each `href` at wherever the files are
published instead, and keep `/favicon.ico` as a root-level copy.
