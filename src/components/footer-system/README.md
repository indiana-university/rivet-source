# Footer System
The footer system is made up of three modules used to provide supplemental links and information about your site or app.

## Footer system modules
1. **Social module** - this module displays icon links to social media profiles
2. **Resources module** - this module can be divided into columns using the Rivet grid. Columns contain lists of links to resources on your site or external links to outside resources.
3. **Base module** - This in the only required module of the footer. It contains links to policy information about accessibility, privacy, and copyright.

## States and roles
The Social and Resources modules must have a `role="complementary"` attribute to create landmarks for assistive technology users. No matter which combination of the Social, Resources, and Base modules you use the first module in the footer, must be a direct sibling of the `<main>` element of the document.

```html
<main>
  <!-- Site main content -->
</main>
<div aria-labelledby="social-heading" class="rvt-footer-social" role="complementary">
  <!-- I'm the direct sibling of the <main> element! -->
  <!-- Social module content -->
</div>
<footer class="rvt-footer-base">
  <!-- Base module content -->
</footer>
```

## Usability guidance
> TODO: Write "Do this, Don't do this..." documentation