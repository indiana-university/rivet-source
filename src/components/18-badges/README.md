# Badges
Use badges to call out or label iportant information in your UI.

## When to use
- To label new content on a page
- To help users descover important information changes in your UI

## When to consider something else
- When there is a critical error that requires the users attention to fix use an page-level alert instead
- Avoid using more than one badge per page as it will dimish the affect of calling out important parts of the UI

## Implementation notes
The font size of the Rivet badges is set using a percentage value so that they will inherit the font size property of their containers. For exampple if you wanted to use a badge inside of an element already using Rivet's type scale utilities, the badge's font size will adjust accordingly.

## Accessiblity
Always be sure to make use of the `.sr-only` utility class to add sufficient information for those using assistive technology like screen readers. The colors of the badge along will not be enough to convey meaning. Adding additional text to the badge and visually hiding it is a good solution.