---
"@rivet-iu/cli": minor
"@rivet-iu/core": minor
"@rivet-iu/tokens": minor
---

- CLI: Added `init` command, which creates a starter `rivet.yaml` config file.
- CLI: Added `build` command, which builds Rivet's CSS, JavaScript, and assets from `rivet.yaml`, including only the stickers you list. Set the output directory with `outputDir` in the config or the `--output` option. Use `--config` to choose a different config file and `--verbose` for detailed build output.
- CLI: The `build` command empties the output directory before each build, but only if the directory is new, empty, or contains `rivet.css` and `rivet.js` from a previous build. Otherwise it stops with an error, so your other files aren't deleted.
- Core: Added a build function the CLI uses to build Rivet inside your project. Vite, Sass, and the Vite plugins are now regular dependencies instead of dev dependencies.
- Tokens: Added a build function the CLI uses to build only the selected stickers. Style Dictionary, Sharp, SVGO, and png-to-ico are now regular dependencies instead of dev dependencies.
- Tokens: Reduced sticker file size by optimizing sticker path data.
