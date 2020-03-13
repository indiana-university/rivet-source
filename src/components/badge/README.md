# Badge

Use badges to call out or label important information in your UI.

>
    Concise labels

    Because badges are intended to call attention to information, it is important to keep badge text concise. It should not span multiple lines.

## When to use

- To label new content on a page
- To help users discover important information changes in your UI

## When to consider something else

- When there is a critical error that requires the users attention to fix, use a page-level alert instead
- Avoid using lots of badges on one page when possible as it will diminish the effect of calling out important parts of the UI

## Adding the markup

### Default badges

```
<span class="rvt-badge">Base</span>
<span class="rvt-badge rvt-badge--info">Info</span>
<span class="rvt-badge rvt-badge--success">Success</span>
<span class="rvt-badge rvt-badge--warning">Warning</span>
<span class="rvt-badge rvt-badge--danger">Danger</span>
```

### Secondary badges

```
<span class="rvt-badge rvt-badge--secondary">Base</span>
<span class="rvt-badge rvt-badge--info-secondary">Info</span>
<span class="rvt-badge rvt-badge--success-secondary">Success</span>
<span class="rvt-badge rvt-badge--warning-secondary">Warning</span>
<span class="rvt-badge rvt-badge--danger-secondary">Danger</span>
```