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
