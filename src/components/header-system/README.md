# Header

Add an IU-branded header and navigation to your website or application.

## Overview

Branding guidelines require each site to have an IU-branded header. For more information on web branding guidelines, visit [brand.iu.edu](brand.iu.edu).

## Usage

A header is made up of four parts: the **base header**, **primary navigation**, **secondary navigation**, and **search**.

> Only the base header is required. Navigation and search are optional.

### Base header

The base header contains the IU trident logo and the title of your website or application.

```html
<header class="rvt-header-wrapper">
    
    <!-- Hidden link for screen reader users to skip to main content -->
    
    <a class="rvt-header-wrapper__skip-link" href="#main-content">Skip to main content</a>
    
    <div class="rvt-header-global">
        <div class="rvt-container-xl">
            <div class="rvt-header-global__inner">
                <div class="rvt-header-global__logo-slot">
                    <a class="rvt-lockup" href="/">

                        <!-- Trident logo -->

                        <div class="rvt-lockup__tab">
                            <svg xmlns="http://www.w3.org/2000/svg" class="rvt-lockup__trident" viewBox="0 0 28 34">
                                <path d="M-3.34344e-05 4.70897H8.83308V7.174H7.1897V21.1426H10.6134V2.72321H8.83308V0.121224H18.214V2.65476H16.2283V21.1426H19.7889V7.174H18.214V4.64047H27.0471V7.174H25.0614V23.6761L21.7746 26.8944H16.2967V30.455H18.214V33.8787H8.76463V30.592H10.6819V26.8259H5.20403L1.91726 23.6077V7.174H-3.34344e-05V4.70897Z" fill="currentColor"></path>
                            </svg>
                        </div>

                        <!-- Website or application title -->
                        
                        <div class="rvt-lockup__body">
                            <span class="rvt-lockup__title">Title</span>
                            <span class="rvt-lockup__subtitle">Subtitle</span>
                        </div>
                    
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>
```

### Header with primary navigation

You can include a set of primary navigation links in the header. These links can optionally be [dropdowns](/components/detail/dropdown) that contain additional links related to a section or category.

Primary navigation is wrapped in a [disclosure](/components/detail/disclosure) that hides the navigation on smaller screens. The navigation remains hidden until the user taps the "menu" button.

```html
<header class="rvt-header-wrapper">
    
    <!-- Hidden link for screen reader users to skip to main content -->
    
    <a class="rvt-header-wrapper__skip-link" href="#main-content">Skip to main content</a>
    
    <div class="rvt-header-global">
        <div class="rvt-container-xl">
            <div class="rvt-header-global__inner">
                <div class="rvt-header-global__logo-slot">
                    <a class="rvt-lockup" href="/">

                        <!-- Trident logo -->

                        <div class="rvt-lockup__tab">
                            <svg xmlns="http://www.w3.org/2000/svg" class="rvt-lockup__trident" viewBox="0 0 28 34">
                                <path d="M-3.34344e-05 4.70897H8.83308V7.174H7.1897V21.1426H10.6134V2.72321H8.83308V0.121224H18.214V2.65476H16.2283V21.1426H19.7889V7.174H18.214V4.64047H27.0471V7.174H25.0614V23.6761L21.7746 26.8944H16.2967V30.455H18.214V33.8787H8.76463V30.592H10.6819V26.8259H5.20403L1.91726 23.6077V7.174H-3.34344e-05V4.70897Z" fill="currentColor"></path>
                            </svg>
                        </div>

                        <!-- Website or application title -->
                        
                        <div class="rvt-lockup__body">
                            <span class="rvt-lockup__title">Title</span>
                            <span class="rvt-lockup__subtitle">Subtitle</span>
                        </div>
                    
                    </a>
                </div>

                <div class="rvt-header-global__controls" data-rvt-disclosure="menu">
                    
                    <!-- Menu button that shows/hides navigation on smaller screens -->
                    
                    <button aria-expanded="false" class="rvt-global-toggle rvt-global-toggle--menu rvt-hide-lg-up" data-rvt-disclosure-toggle="menu">
                        <span class="rvt-sr-only">Menu</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="rvt-global-toggle__open" viewBox="0 0 16 16">
                            <g fill="currentColor">
                                <path d="M15,3H1A1,1,0,0,1,1,1H15a1,1,0,0,1,0,2Z"></path>
                                <path d="M15,9H1A1,1,0,0,1,1,7H15a1,1,0,0,1,0,2Z"></path>
                                <path d="M15,15H1a1,1,0,0,1,0-2H15a1,1,0,0,1,0,2Z"></path>
                            </g>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="rvt-global-toggle__close" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.46954 7.00409L13.7595 1.71409C13.9234 1.52279 14.009 1.27671 13.9993 1.02504C13.9895 0.773362 13.8852 0.534623 13.7071 0.356528C13.529 0.178434 13.2903 0.0741014 13.0386 0.0643803C12.7869 0.0546591 12.5408 0.140265 12.3495 0.304092L7.05954 5.59409L1.76954 0.294092C1.58124 0.105788 1.32585 -3.72428e-09 1.05954 -1.74018e-09C0.793242 2.43924e-10 0.537847 0.105788 0.349544 0.294092C0.16124 0.482395 0.055452 0.73779 0.055452 1.00409C0.055452 1.27039 0.16124 1.52579 0.349544 1.71409L5.64954 7.00409L0.349544 12.2941C0.244862 12.3837 0.159841 12.4941 0.0998179 12.6181C0.0397946 12.7422 0.00606467 12.8773 0.000745174 13.015C-0.00457432 13.1528 0.0186315 13.2901 0.0689061 13.4184C0.119181 13.5467 0.195439 13.6633 0.292893 13.7607C0.390348 13.8582 0.506896 13.9345 0.635221 13.9847C0.763546 14.035 0.900878 14.0582 1.0386 14.0529C1.17632 14.0476 1.31145 14.0138 1.43551 13.9538C1.55958 13.8938 1.6699 13.8088 1.75954 13.7041L7.05954 8.41409L12.3495 13.7041C12.5408 13.8679 12.7869 13.9535 13.0386 13.9438C13.2903 13.9341 13.529 13.8297 13.7071 13.6517C13.8852 13.4736 13.9895 13.2348 13.9993 12.9831C14.009 12.7315 13.9234 12.4854 13.7595 12.2941L8.46954 7.00409Z" fill="currentColor"></path>
                        </svg>
                    </button>

                    <nav aria-label="Global navigation" class="rvt-header-menu" data-rvt-disclosure-target="menu" hidden>
                        <ul class="rvt-header-menu__list">

                            <!-- Navigation link without dropdown -->
                            
                            <li class="rvt-header-menu__item">
                                <a class="rvt-header-menu__link" href="#">Nav Item Three</a>
                            </li>

                            <!-- Navigation link marked as the current page -->

                            <li class="rvt-header-menu__item rvt-header-menu__item--current">
                                <a class="rvt-header-menu__link" href="#" aria-current="page">Nav Item Three</a>
                            </li>

                            <!-- Navigation link with dropdown -->

                            <li class="rvt-header-menu__item">
                                <div class="rvt-header-menu__dropdown rvt-dropdown" data-rvt-dropdown="primary-nav-1">
                                    <div class="rvt-header-menu__group">
                                        
                                        <!-- Link that appears in header -->
                                        
                                        <a class="rvt-header-menu__link" href="#">Nav Item One</a>
                                        
                                        <!-- Button that shows/hides dropdown links -->
                                        
                                        <button aria-expanded="false" class="rvt-dropdown__toggle rvt-header-menu__toggle" data-rvt-dropdown-toggle="primary-nav-1">
                                            <span class="rvt-sr-only">Toggle Sub-navigation</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="rvt-global-toggle__open" height="16" viewBox="0 0 16 16" width="16">
                                                <path d="M8,12.46a2,2,0,0,1-1.52-.7L1.24,5.65a1,1,0,1,1,1.52-1.3L8,10.46l5.24-6.11a1,1,0,0,1,1.52,1.3L9.52,11.76A2,2,0,0,1,8,12.46Z" fill="currentColor"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="rvt-header-menu__submenu rvt-dropdown__menu rvt-dropdown__menu--right" data-rvt-dropdown-menu="primary-nav-1" hidden>
                                        <ul class="rvt-header-menu__submenu-list">

                                            <!-- Dropdown links -->

                                            <li class="rvt-header-menu__submenu-item">
                                                <a class="rvt-header-menu__submenu-link" href="#">Sub Item One</a>
                                            </li>

                                            <li class="rvt-header-menu__submenu-item">
                                                <a class="rvt-header-menu__submenu-link" href="#">Sub Item Two</a>
                                            </li>

                                            <li class="rvt-header-menu__submenu-item">
                                                <a class="rvt-header-menu__submenu-link" href="#">Sub Item Three</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</header>
```

### Marking the current section or page

You can mark the current section or page in the primary navigation by:

- Adding the `.rvt-header-menu__item--current` class to an `li` element that has the `.rvt-header-menu__item` class
- Adding the `aria-current="page"` attribute to the `a` child element within the `li` element described in the previous bullet point

The second link in the example primary navigation code above has been marked as the current page.

## Search

You can include search in the header. The search field is hidden in a [disclosure](/components/detail/disclosure) until the search button (a magnifying glass) is clicked or tapped.

> You can use search with or without primary navigation. If you use primary navigation, search must appear *after* it in your markup.

```html
<header class="rvt-header-wrapper">
    
    <!-- Hidden link for screen reader users to skip to main content -->
    
    <a class="rvt-header-wrapper__skip-link" href="#main-content">Skip to main content</a>
    
    <div class="rvt-header-global">
        <div class="rvt-container-xl">
            <div class="rvt-header-global__inner">
                <div class="rvt-header-global__logo-slot">
                    <a class="rvt-lockup" href="/">

                        <!-- Trident logo and site title... -->
                    
                    </a>
                </div>

                <div class="rvt-header-global__controls" data-rvt-disclosure="menu">
                    
                  <nav aria-label="Global navigation" class="rvt-header-menu" data-rvt-disclosure-target="menu" hidden>
                    <!-- Primary navigation... -->
                  </nav>

                  <!-- Search -->

                  <div data-rvt-disclosure="search">
                      
                      <!-- Button that shows/hides the search field -->
                      
                      <button class="rvt-global-toggle" data-rvt-disclosure-toggle="search" aria-expanded="false">
                          <span class="rvt-sr-only">Search</span>
                          <svg xmlns="http://www.w3.org/2000/svg" class="rvt-global-toggle__search" height="16" viewBox="0 0 16 16" width="16">
                              <path d="M15.71,14.29,10.89,9.47a6,6,0,1,0-1.42,1.42l4.82,4.82a1,1,0,0,0,1.42,0A1,1,0,0,0,15.71,14.29ZM6,10a4,4,0,1,1,4-4A4,4,0,0,1,6,10Z" fill="currentColor"></path>
                          </svg>
                      </button>

                      <!-- Search field -->

                      <form action="/search" class="rvt-header-global__search" data-rvt-disclosure-target="search" role="search" method="get" hidden>
                          <label class="rvt-sr-only" for="search">Search</label>
                          <div class="rvt-input-group">
                              <input class="rvt-input-group__input rvt-text-input" type="text" name="q">
                              <div class="rvt-input-group__append">
                                  <button class="rvt-button">Search</button>
                              </div>
                          </div>
                      </form>
                  </div>
                </div>
            </div>
        </div>
    </div>
</header>
```

### Implementing search

By default, the user is sent to the URL `/search` when they submit a search query. The value of their search query is appended to the page URL as the query string parameter `q`.

```
GET /search?q={search query}
```

It is up to you to implement a method for handling search queries on your website or application &mdash; most sites use [Google Custom Search](https://developers.iu.edu/resources/google-custom-search/).

If you'd like search to function differently, you can:

- Change the value of the `action` and `method` attributes on the search `form` element
- Change the value of the `name` attribute on the search `input` element

To handle submitted search queries yourself without redirecting the user to a new page, use the following JavaScript:

```js
const search = document.querySelector('[data-rvt-disclosure="search"] form');

search.addEventListener('submit', event => {
  event.preventDefault();

  const query = this.querySelector('input').value;

  // Handle query...
});
```