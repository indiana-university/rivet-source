# `@rivet-iu/core`

CSS and JavaScript for Rivet components.

## Favicons

Rivet ships IU favicons, generated from the `graphic` design tokens in
`@rivet-iu/tokens`. Three files are published in `dist`:

| File                   | Size             | Purpose                             |
| ---------------------- | ---------------- | ----------------------------------- |
| `apple-touch-icon.png` | 180px            | Home screen icon for iOS and iPadOS |
| `favicon.ico`          | 16px, 32px, 48px | Legacy browsers                     |
| `favicon.svg`          | any              | Modern browsers                     |

Link these files in `<head>`.

```html
<link href="/favicon.svg" rel="icon" type="image/svg+xml" />
<link href="/favicon.ico" rel="icon" sizes="16x16 32x32 48x48" />
<link href="/apple-touch-icon.png" rel="apple-touch-icon" />
```

Ideally, serve these files from the site root, since that will allow some services to find the files before needing to read the site markup. Otherwise, update the `href` value to match your use case.
