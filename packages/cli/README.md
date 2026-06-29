# Rivet CLI

CLI tool for the Rivet Design System

## Commands

### Search

Searches contents of files based on one or more patterns:

`pnpm dlx @rivet-cli/cli search <directory> <patterns> --output <file-name>.md`

**`<directory>`**

name of directory to search

**`<patterns>`**

search pattern(s) separated by a space

_Single pattern_

`pnpm dlx @rivet-cli/cli ... foo`

_Multiple patterns_

`pnpm dlx @rivet-cli/cli ... foo bar`

You can also add quotes around each pattern for easier readability:

`pnpm dlx @rivet-cli/cli ... "foo" "bar"`

#### Examples

**Find all instances of Rivet margin and padding utility classes**:

`pnpm dlx @rivet-cli/cli search <dir-name> rvt-m rvt-p`

**Find all instances of custom Rivet override classes**:

`pnpm dlx @rivet-cli/cli search <dir-name> rvt-c`

## Write full results to Markdown file

By default, a simplified output of results are printed to the command line. If you'd like a thorough report written to a Markdown file, add the `--output` flag:

`pnpm dlx @rivet-cli/cli <command> <patterns> --output <file-name>.md`

**Example: find all instances of custom Rivet override classes and write results to file**:

`pnpm dlx @rivet-cli/cli search <dir-name> rvt-c --output overrides.md`
