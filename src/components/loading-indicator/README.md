# Loading indicator

The Rivet loading indicator helps notify users when their action is being processed

> New in Rivet 1.2.0

> The loading indicator is new as of 1.2.0. If you need help moving to 1.2.0, see our [instructions for updating Rivet](#).

## Adding the markup

The loading indicator is made up of a `div` with the class `rvt-loader` and an `aria-label` attribute.

```
<div class="rvt-loader" aria-label="Content loading"></div>
```