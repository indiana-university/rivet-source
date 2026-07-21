# Rivet CLI

CLI tool for the Rivet Design System

## Search

Searches contents of files based on one or more patterns:

`pnpm dlx @rivet-iu/cli search <directory> <patterns> --output <file-name>.md`

| Element                   | Description                             |
| ------------------------- | --------------------------------------- |
| `search`                  | the search command                      |
| `<directory>`             | name of directory to recursively search |
| `<patterns>`              | search pattern(s) separated by a space  |
| `--output <file-name>.md` | output full results to a Markdown file  |

### Usage

```shell
# Single pattern
pnpm dlx @rivet-iu/cli search src foo

# Multiple patterns
pnpm dlx @rivet-iu/cli search src foo bar

# You can also add quotes around each pattern for easier readability
pnpm dlx @rivet-iu/cli search src "foo" "bar"
```

### Examples

```shell
# Find all instances of Rivet margin and padding utility classes
pnpm dlx @rivet-iu/cli search src "rvt-m" "rvt-p"

# Find all instances of custom Rivet override classes
pnpm dlx @rivet-iu/cli search src "rvt-c"
```

### Write full results to Markdown file

By default, a simplified output of results are printed to the command line. If you'd like a thorough report written to a Markdown file, add the `--output` flag:

```
pnpm dlx @rivet-iu/cli <command> <patterns> --output <file-name>.md
```

By default, the file is written to the path from which you are running the command. You can also output the file to a preferred location on your computer:

```
pnpm dlx @rivet-iu/cli search <dir-name> rvt-c --output ~/Desktop/<file-name>.md
```
