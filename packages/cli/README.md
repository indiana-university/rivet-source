# Rivet CLI

CLI tool for the Rivet Design System

## Search

Search contents of files based on one or more patterns.

`pnpm dlx @rivet-iu/cli search <directory> <patterns> --output <file-name>.md`

| Element                   | Description                             |
| ------------------------- | --------------------------------------- |
| `<directory>`             | name of directory to recursively search |
| `<patterns>`              | search pattern(s) separated by a space  |
| `--output <file-name>.md` | output full results to a Markdown file  |

### Usage

Search for margin utility classes in the current directory.

```shell
pnpm dlx @rivet-iu/cli search . rvt-m-
```

Search for margin and padding utility classes in the src directory. Optionally wrap the patterns in quotes.

```shell
pnpm dlx @rivet-iu/cli search src "rvt-m-" "rvt-p-"
```

Output full results to a Markdown file in the current directory.

```shell
pnpm dlx @rivet-iu/cli search src "rvt-m-" "rvt-p-" --output results.md
```

Output full results to a Markdown file on the desktop.

```shell
pnpm dlx @rivet-iu/cli search src "rvt-m-" "rvt-p-" --output ~/Desktop/results.md
```

## `init`

Generate a starter `rivet.yaml` configuration file in the current directory.

`pnpm dlx @rivet-iu/cli init`

| Element               | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| `-c, --config <file>` | name of the config file to generate (default: `rivet.yaml`) |
| `-f, --force`         | overwrite an existing config file                           |

### Usage

Generate a `rivet.yaml` file in the current directory.

```shell
pnpm dlx @rivet-iu/cli init
```

Replace an existing `rivet.yaml` file with a fresh starter file.

```shell
pnpm dlx @rivet-iu/cli init --force
```

## `build`

Build Rivet's CSS, JavaScript, and assets using the settings in your Rivet config file. If no config file is found, the build includes all Rivet assets.

`pnpm dlx @rivet-iu/cli build`

| Element               | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| `-c, --config <file>` | name of the config file to use (default: `rivet.yaml`)       |
| `-o, --output <dir>`  | directory to output built assets into; overrides `outputDir` |
| `-v, --verbose`       | print detailed output from the build process                 |

The output directory is chosen in this order:

1. The `--output` option, if provided
2. The `outputDir` value in the config file, if set
3. The default, `@rivet-iu/core/dist`

All output paths are relative to the directory where you run the command, including `outputDir` values from the config file. The build results show which of these was used, for example `Output directory (from rivet.yaml)`.

### Usage

Build using the settings in `rivet.yaml` in the current directory.

```shell
pnpm dlx @rivet-iu/cli build
```

Build using a config file with a different name.

```shell
pnpm dlx @rivet-iu/cli build --config rivet.dev.yaml
```

Output built assets to a `dist` directory, overriding `outputDir` in the config file.

```shell
pnpm dlx @rivet-iu/cli build --output dist
```

## Configuration

The `rivet.yaml` file controls what the `build` command produces. Run `init` to generate a starter file.

```yaml
# Directory to output built assets into, relative to where you run 'rivet build'
outputDir: "./custom-dir"

# Stickers to include in the build; omit to include all stickers
stickers:
  - accessibility
  - airplane
  - etc
```

| Setting     | Description                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| `outputDir` | directory to output built assets into (default: `@rivet-iu/core/dist`)                                       |
| `stickers`  | list of stickers to include; see the [sticker library](https://rivet.iu.edu/icons-stickers/sticker-library/) |

Paths that start with `@` must be wrapped in quotes, for example `outputDir: '@rivet-iu/core/dist'`.
