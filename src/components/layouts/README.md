#Layouts
Pre-built layouts to give developers a head start when building websites and apps.

## Overview
Every Rivet layout starts with a small amount of HTML with specific CSS classes applied. This is the most basic Rivet Layout that includes the base `rvt-layout` CSS class, a version of the [Rivet header](/docs/components/header/), and a version of the [Rivet footer](/docs/components/footer/).

## Usage
With the `rvt-layout__wrapper` CSS class applied to the `main` element it will automatically push the footer to the bottom of the viewport if there is not enough content to fill up the screen.

```html
<body class="rvt-layout">
  <header class="rvt-header-wrapper">
    <!-- Rivet header markup -->
  </header>
  <main class="rvt-layout__wrapper">
    <!-- Site or App specific Layout content -->
  </main>
  <footer class="rvt-footer-base">
    <!-- Rivet footer markup -->
  </footer>
</body>
```

### Additional layout elements
In addition to the base Rivet Layout elements `rvt-layout` and `rvt-layout__wrapper`, developers can create a common two-column layout on larger screens with two additional elements using the CSS classes `rvt-layout__sidebar` and `rvt-layout__content`.

```html
<body class="rvt-layout">
  <header class="rvt-header-wrapper">
    <!-- Rivet header markup -->
  </header>
  <main class="rvt-layout__wrapper">
    <div class="rvt-layout__sidebar">
      <!-- Rivet Sidenav component -->
    </div>
    <div class="rvt-layout__content">
      <!-- Site or App specific Layout content -->
    </div>
  </main>
  <footer class="rvt-footer-base">
    <!-- Rivet footer markup -->
  </footer>
</body>
```
