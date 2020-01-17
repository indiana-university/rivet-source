# Sidenav
A vertical display for nested lists of navigation links

## Description
Use the sidenav component to provide users with the ability to navigate 
nested sections and links relative to where the user is currently at on the 
site.

The sidenav is useful to allow the user to quickly navigate to a page nested
deeply within a section, without having to navigate to each page individually 
along the way.

## When to use
- To provide links for navigating sections and pages within another section
- When the order and nesting of the lists match the site structure of pages

## When to consider something else
- When the links do not direct to other pages within the site
- When the nested lists within the navigation exceeds four levels deep

## Adding the markup

### Section menu toggling functionality

The primary functionality of the sidenav consists of openable menus, which reveal nested section navigation matching the structure of a section's page hierarchy. In order for the menus to open and close, a toggle button is required, and the values for the attribute `data-sidenav-toggle` on the button and the attribute `data-sidenav-list` on the nested list must match. In this instance, the values are both `toggle-1`.

```
<nav class="rvt-sidenav" aria-label="Sidenav" data-sidenav>
  <ul class="rvt-sidenav__list">
    <li class="rvt-sidenav__item">
      <a href="#" class="rvt-sidenav__link">Section nav</a>

      <!-- Toggle button -->
      <button class="rvt-sidenav__toggle" data-sidenav-toggle="toggle-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <path fill="currentColor" d="M8,12.46a2,2,0,0,1-1.52-.7L1.24,5.65a1,1,0,1,1,1.52-1.3L8,10.46l5.24-6.11a1,1,0,0,1,1.52,1.3L9.52,11.76A2,2,0,0,1,8,12.46Z"/>
        </svg>
      </button>

      <!-- Nested list -->
      <ul class="rvt-sidenav__list" data-sidenav-list="toggle-1" role="menu">

        <!-- Nested pages -->
        ...
        <li class="rvt-sidenav__item">
          <a href="#" class="rvt-sidenav__link">Nested page 1</a>
        </li>
        ...
      </ul>
    </li>
  </ul>
</nav>
```

### Nesting multiple sections

Sections can be nested up to four levels deep.

```
<nav class="rvt-sidenav" aria-label="Sidenav" data-sidenav>
  <ul class="rvt-sidenav__list">
    <li class="rvt-sidenav__item">
      <a href="#" class="rvt-sidenav__link" aria-current="page">Section nav</a>

      <!-- Toggle button for nested level 1 -->
      <button class="rvt-sidenav__toggle" data-sidenav-toggle="toggle-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <path fill="currentColor" d="M8,12.46a2,2,0,0,1-1.52-.7L1.24,5.65a1,1,0,1,1,1.52-1.3L8,10.46l5.24-6.11a1,1,0,0,1,1.52,1.3L9.52,11.76A2,2,0,0,1,8,12.46Z"/>
        </svg>
      </button>

      <!-- Nested list 1 -->
      <ul class="rvt-sidenav__list" data-sidenav-list="toggle-1" role="menu">
        <li class="rvt-sidenav__item">
          <a href="#" class="rvt-sidenav__link">Nested level 1 – page 1</a>
        </li>
        <li class="rvt-sidenav__item">
          <a href="#" class="rvt-sidenav__link">Nested level 1 – page 2</a>

          <!-- Toggle button for nested level 2 -->
          <button class="rvt-sidenav__toggle" data-sidenav-toggle="toggle-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
              <path fill="currentColor" d="M8,12.46a2,2,0,0,1-1.52-.7L1.24,5.65a1,1,0,1,1,1.52-1.3L8,10.46l5.24-6.11a1,1,0,0,1,1.52,1.3L9.52,11.76A2,2,0,0,1,8,12.46Z"/>
            </svg>
          </button>

          <!-- Nested list 2 -->
          <ul class="rvt-sidenav__list" data-sidenav-list="toggle-2" role="menu">
            <li class="rvt-sidenav__item">
              <a href="#" class="rvt-sidenav__link">Nested level 2 – page 1</a>
            </li>
            <li class="rvt-sidenav__item">
              <a href="#" class="rvt-sidenav__link">Nested level 2 – page 2</a>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</nav>
```

### Setting a current page

To designate a specific page the user is currently viewing, set the attribute ` aria-current="page"` on any section level link (`<a href="#" class="rvt-sidenav__link">`).

```
<nav class="rvt-sidenav" aria-label="Sidenav" data-sidenav>
  <ul class="rvt-sidenav__list">
    <li class="rvt-sidenav__item">
      <a href="#" class="rvt-sidenav__link" aria-current="page">Section nav</a>
    </li>
  </ul>
</nav>
```

## Initializing the component

To initialize the sidenav component, use JavaScript to select the data attribute `[data-sidenav]`, then create a new instance using `Rivet.Sidenav()`. Options can be passed within an object in the second argument.

```
  var sidenavElement = document.querySelector('[data-sidenav]');
  var newSidenav = new Rivet.Sidenav(sidenavElement, {
    openAllOnInit: false
  });
```

## Using public methods

The following public methods are available to use within your project: `init`, `open`, `close`, and `destroy`.

**Method:**

`Sidenav.init()`

**Description**
- Initializes an instance of the sidenav

---

**Method:**

`Sidenav.open(toggleButton, targetList)`

**Description**
- Opens a specific menu
- Requires the toggle button (`button.data-sidenav-toggle`) and target list (`ul.data-sidenav-list`) elements as arguments

---

**Method**

`Sidenav.close(toggleButton, targetList)`

**Description**
- Closes a specific menu
- Requires the toggle button (`button.data-sidenav-toggle`) and target list (`ul.data-sidenav-list`) elements as arguments

---

**Method**

`Sidenav.destroy()`

**Description**
- Destroys a specific instance of the sidenav by removing the event listener from the component

## Custom events

**Event**

`openEvent`

**Description**

- Emitted after a user clicks on the toggle button and opens a menu
- Emitted after a menu is programmatically opened using `Sidenav.open()`

---

**Event**

`closeEvent`

**Description**

- Emitted after a user clicks on the toggle button and closes a menu
- Emitted after a menu is programmatically closed using `Sidenav.close()`

## Implementation notes
- Avoid nesting site sections deeper than four levels deep