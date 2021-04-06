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