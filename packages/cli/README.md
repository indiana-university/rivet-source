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
