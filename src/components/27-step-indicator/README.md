# Step indicator
The step indicator component can be used to help users keep track of their progress in a multi-step interaction.

## When to use
- Your form or interaction is long enough to break up into three or more steps
- To communicate how many steps there are in a structured process
- To communicate the success or failure of each step in a process

## When to consider something else
- For general page-to-page navigation, use a dedicated nav element
- Navigation for situations when users do not need to complete all steps of a process
- For normal lists, use ordered lists or unordered lists

## Implementation notes
- Use `aria-hidden` to hide indicators from screen readers if label has the number of step in it.
- Use `aria-current` to indicate the current state
- Keep labels short (1-2 words)
- Provide users with links to completed steps
- If possible do not provide users with links to future steps before they have completed the current step