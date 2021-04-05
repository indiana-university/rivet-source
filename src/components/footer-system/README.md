# Footer

Add an IU-branded footer to your website or application.

## Overview

Branding guidelines require each site to have an IU-branded footer. For more information on web branding guidelines, visit [brand.iu.edu](brand.iu.edu).

## Usage

A footer is made up of three parts: the **base footer**, the **resources module**, and the **social module**.

> Only the base footer is required. The resources and social modules are optional.

### Base footer (required)

The base footer contains the IU trident, copyright information, and links related to accessibility and privacy.

```html
<!-- Main site content. The <footer> element must be a sibling of <main>. -->

<main>
  <!-- ... -->
</main>

<!-- Base footer -->

<footer class="rvt-footer-base">
  <div class="rvt-container-lg">
    <div class="rvt-footer-base__inner">

      <!-- IU trident -->

      <div class="rvt-footer-base__logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <polygon fill="currentColor" points="15.3 3.19 15.3 5 16.55 5 16.55 15.07 13.9 15.07 13.9 1.81 15.31 1.81 15.31 0 8.72 0 8.72 1.81 10.12 1.81 10.12 15.07 7.45 15.07 7.45 5 8.7 5 8.7 3.19 2.5 3.19 2.5 5 3.9 5 3.9 16.66 6.18 18.98 10.12 18.98 10.12 21.67 8.72 21.67 8.72 24 15.3 24 15.3 21.67 13.9 21.67 13.9 18.98 17.82 18.98 20.09 16.66 20.09 5 21.5 5 21.5 3.19 15.3 3.19" fill="#231f20"/>
        </svg>
      </div>

      <!-- List of links -->

      <ul class="rvt-footer-base__list">
        <li class="rvt-footer-base__item">
          <a class="rvt-footer-base__link" href="https://accessibility.iu.edu/assistance/">Accessibility</a>
        </li>
        <li class="rvt-footer-base__item">
          <a class="rvt-footer-base__link" href="#">Privacy Notice</a>
        </li>
        <li class="rvt-footer-base__item">
          <a class="rvt-footer-base__link" href="#">Copyright</a> © 2021 The Trustees of <a class="rvt-footer-base__link" href="https://www.iu.edu">Indiana University</a>
        </li>
      </ul>
    </div>
  </div>
</footer>
```

### Resources module (optional)

The optional resources module contains lists of links to resources your site's visitors might find helpful. These lists of links can be grouped into columns by category.

The resources module also contains a column in which you can put an address, buttons, or other information.

> The optional resources module must appear *before* the base footer in your markup. It must also be a sibling of both `main` and `footer`.

To see an example footer that uses the resources module, visit [iu.edu](iu.edu).

```html
<!-- Main site content -->

<main>
  <!-- ... -->
</main>

<!-- Footer resources module. Must appear before the base footer and be a sibling of both <main> and <footer>. -->

<div aria-labelledby="resources-heading" class="rvt-footer-resources" role="complementary">
    
    <!-- Heading for people using screen readers -->
    
    <h2 class="rvt-sr-only" id="resources-heading">Additional resources</h2>
    
    <div class="rvt-container-lg">
        <div class="rvt-row">
            
            <!-- Column containing an address -->
            
            <div class="rvt-cols-3-md">
                <h3 class="rvt-footer-resources__heading">Indiana University</h3>
                <div class="rvt-footer-resources__text-block">
                  107 S. Indiana Avenue<br/>
                  Bloomington, IN<br/>
                  47405-7000
                </div>
            </div>

            <!-- Column containing a categorized list of resource links -->

            <div class="rvt-cols-3-md">
                <h3 class="rvt-footer-resources__heading">Services</h3>
                <ul class="rvt-footer-resources__list">
                    <li class="rvt-footer-resources__list-item">
                        <a href="https://canvas.iu.edu">Canvas</a>
                    </li>
                    <li class="rvt-footer-resources__list-item">
                        <a href="https://one.iu.edu">One.IU</a>
                    </li>
                </ul>
            </div>

            <!-- Column containing a categorized list of resource links -->

            <div class="rvt-cols-3-md">
                <h3 class="rvt-footer-resources__heading">Email</h3>
                <ul class="rvt-footer-resources__list">
                    <li class="rvt-footer-resources__list-item">
                        <a href="https://uits.iu.edu/exchange">Outlook Web Access</a>
                    </li>

                    <li class="rvt-footer-resources__list-item">
                        <a href="https://google.iu.edu">Gmail at IU</a>
                    </li>
                </ul>
            </div>

            <!-- Column containing a categorized list of resource links -->

            <div class="rvt-cols-3-md">
                <h3 class="rvt-footer-resources__heading">Find</h3>
                <ul class="rvt-footer-resources__list">
                    <li class="rvt-footer-resources__list-item">
                        <a href="https://directory.iu.edu/">People Directory</a>
                    </li>
                    <li class="rvt-footer-resources__list-item">
                        <a href="https://jobs.iu.edu/">Jobs at IU</a>
                    </li>
                    <li class="rvt-footer-resources__list-item">
                        <a href="/nondiscrimination/index.html">Non-discrimination Notice</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

<!-- Base footer from previous section -->

<footer class="rvt-footer-base">
  <!-- ... -->
</footer>
```

#### Adjusting the number of columns

You can include as many or as few columns as you like in the resources module, provided the total column width equals 12. 

In the example above, there are 4 columns each with a width of 3 as specified by the `rvt-cols-3-md` class.

For more on using columns, see the [instructions for using the Rivet grid](/components/detail/grid).

### Social module (optional)

The optional social module contains icons that link to your unit's social media profiles.

Markup for SVG social media icons are available at [someurl.iu.edu](#).

> The optional social module must appear *before* the base footer in your markup. It must also be a sibling of both `main` and `footer`.

> If you are using both the social and resources modules, the social module must appear first in your markup.

To see an example footer that uses the social module, visit [iu.edu](iu.edu).

```html
<!-- Main site content -->

<main>
  <!-- ... -->
</main>

<!-- Footer social module. Must appear before the base footer and resources module. Must be a sibling of both <main> and <footer>. -->

<div aria-labelledby="social-heading" class="rvt-footer-social" role="complementary">
    <div class="rvt-container-lg">
        
        <!-- Heading for people using screen readers -->
        
        <h2 class="rvt-sr-only" id="social-heading">Social media</h2>
        
        <ul class="rvt-footer-social__list">

            <!-- Linked social media icon -->

            <li>
                <a href="https://www.facebook.com/IndianaUniversity">
                    <span class="rvt-sr-only rvt-color-white">Facebook for IU</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="40" viewBox="0 0 40 40" width="40">
                        <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#7A1705"></path>
                        <path d="M24.8996 9.99982V13.1998H23.0996C23.0996 13.1998 21.4996 12.9998 21.4996 14.4998V16.9998H24.7996L24.3996 20.3998H21.4996V29.9998H17.6996V20.2998H15.0996V16.9998H17.7996V14.0998C17.7996 14.0998 17.4996 12.4998 18.8996 11.1998C20.2996 9.89982 22.1996 9.99982 22.1996 9.99982H24.8996Z" fill="#F7F7F8"></path>
                    </svg>
                </a>
            </li>

            <!-- Linked social media icon -->

            <li>
                <a href="https://www.linkedin.com/company/indiana-university/">
                    <span class="rvt-sr-only rvt-color-white">Linkedin for IU</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="40" viewBox="0 0 40 40" width="40">
                        <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#7A1705"></path>
                        <path d="M11.3 16H15V28H11.3V16ZM13.2 10C14.4 10 15.4 11 15.4 12.2C15.4 13.4 14.4 14.4 13.2 14.4C12 14.4 11 13.4 11 12.2C11 11 12 10 13.2 10Z" fill="#F7F7F8"></path>
                        <path d="M17.3999 16.0002H20.9999V17.6002C21.4999 16.7002 22.6999 15.7002 24.4999 15.7002C28.2999 15.7002 28.9999 18.2002 28.9999 21.4002V28.0002H25.2999V22.2002C25.2999 20.8002 25.2999 19.0002 23.3999 19.0002C21.4999 19.0002 21.1999 20.5002 21.1999 22.1002V28.0002H17.4999V16.0002H17.3999Z" fill="#F7F7F8"></path>
                    </svg>
                </a>
            </li>

            <!-- Linked social media icon -->

            <li>
                <a href="https://twitter.com/IndianaUniv">
                    <span class="rvt-sr-only rvt-color-white">Twitter for IU</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="40" viewBox="0 0 40 40" width="40">
                        <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#7A1705"></path>
                        <path d="M30.0002 13.7998C29.3002 14.0998 28.5002 14.2998 27.6002 14.3998C28.4002 13.8998 29.1002 13.0998 29.4002 12.0998C28.6002 12.5998 27.7002 12.8998 26.8002 13.0998C26.1002 12.2998 25.0002 11.7998 23.8002 11.7998C21.5002 11.7998 19.7002 13.5998 19.7002 15.8998C19.7002 16.1998 19.7002 16.4998 19.8002 16.7998C16.4002 16.5998 13.4002 14.9998 11.3002 12.4998C10.9002 13.0998 10.7002 13.7998 10.7002 14.5998C10.7002 15.9998 11.4002 17.2998 12.5002 17.9998C11.8002 17.9998 11.2002 17.7998 10.6002 17.4998C10.6002 17.4998 10.6002 17.4998 10.6002 17.5998C10.6002 19.5998 12.0002 21.1998 13.9002 21.5998C13.6002 21.6998 13.2002 21.6998 12.8002 21.6998C12.5002 21.6998 12.3002 21.6998 12.0002 21.5998C12.5002 23.1998 14.0002 24.3998 15.8002 24.3998C14.4002 25.4998 12.6002 26.1998 10.7002 26.1998C10.4002 26.1998 10.0002 26.1998 9.7002 26.0998C11.5002 27.2998 13.7002 27.8998 16.0002 27.8998C23.5002 27.8998 27.7002 21.5998 27.7002 16.1998C27.7002 15.9998 27.7002 15.7998 27.7002 15.6998C28.8002 15.2998 29.4002 14.5998 30.0002 13.7998Z" fill="#F7F7F8"></path>
                    </svg>
                </a>
            </li>
        </ul>
    </div>
</div>

<!-- Footer resources module from previous section -->

<div aria-labelledby="resources-heading" class="rvt-footer-resources" role="complementary">
  <!-- ... -->
</div>

<!-- Base footer from previous section -->

<footer class="rvt-footer-base">
  <!-- ... -->
</footer>
```

## Accessibility

The footer is built to follow the WAI-ARIA authoring standards. It is marked up with the appropriate ARIA attributes, described below.

### ARIA attributes

|Attribute|Description|
|-|-|
|`role="complementary"`|Applied to the container `div` for the optional resources and social modules|
|`aria-labelledby="resources-heading"`|Applied to the container `div` for the optional resources module. The value of this attribute matches the `id` of the `h2` child element containing the screen reader title.|
|`aria-labelledby="social-heading"`|Applied to the container `div` for the optional social module. The value of this attribute matches the `id` of the `h2` child element containing the screen reader title.|