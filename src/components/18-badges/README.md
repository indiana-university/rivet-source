# Badges
Use badges to call out or label important information in your UI.

## When to use
- To label new content on a page
- To help users discover important information changes in your UI

## When to consider something else
- When there is a critical error that requires the users attention to fix use an page-level alert instead
- Avoid using more than one badge per page as it will dimiss the affect of calling out important parts of the UI

## Implementation notes
The font size of the Rivet badges is set using a percentage value so that they will inherit the font size property of their containers. For example, if you wanted to use a badge inside of an element already using Rivet's type scale utilities, the badge's font size will adjust accordingly.

## Accessiblity
Badges are visual indicators that the information is important, but visual queues are insufficient for those using assistive technologies, such as screen readers. The colors of the badge alone will not be enough to convey meaning to screen readers. Use the `.sr-only` utility class to add sufficient information with the text of the badge. Adding additional text to the badge and visually hiding the additional text is a good user experience.