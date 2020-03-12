# File input

## When to use
Use the file input component when the user is required to upload a file from their local computer.

## Adding the Markup

### Wrapper

The file input component is made up of a wrapping `div` with the class `rvt-file` and the data attribute `data-upload-wrapper`.

```
<div class="rvt-file" data-upload-wrapper="fileInputId">

</div>
```

### Elements

**`input`**:

```
<input type="file" data-upload-input="fileInputId" id="fileInputId" aria-describedby="file-description">
```

**`label`**:

```
<label for="fileInputId" class="rvt-button">
    <span>Upload a file</span>
    <svg role="img" alt="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <path fill="currentColor" d="M10.41,1H3.5A1.3,1.3,0,0,0,2.2,2.3V13.7A1.3,1.3,0,0,0,3.5,15h9a1.3,1.3,0,0,0,1.3-1.3V4.39ZM11.8,5.21V6H9.25V3h.34ZM4.2,13V3h3V6.75A1.25,1.25,0,0,0,8.5,8h3.3v5Z"/>
    </svg>
</label>
```

**`div`**:

```
<div class="rvt-file__preview" data-upload-preview="fileInputId" id="file-description">
    No file selected
</div>
```

The elements `div[data-upload-wrapper]`, `input[data-upload-input]`, `input[id]`, and `div[data-upload-preview]` should all have the same unique `id`.

The attribute `input[aria-describedby]` should match `div[id]` for assistive technology to properly read the file description.

```
<div class="rvt-file" data-upload-wrapper="fileInputId">
    <input type="file" data-upload-input="fileInputId" id="fileInputId" aria-describedby="file-description">
    <label for="fileInputId" class="rvt-button">
        <span>Upload a file</span>
        <svg role="img" alt="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path fill="currentColor" d="M10.41,1H3.5A1.3,1.3,0,0,0,2.2,2.3V13.7A1.3,1.3,0,0,0,3.5,15h9a1.3,1.3,0,0,0,1.3-1.3V4.39ZM11.8,5.21V6H9.25V3h.34ZM4.2,13V3h3V6.75A1.25,1.25,0,0,0,8.5,8h3.3v5Z"/>
        </svg>
    </label>
    <div class="rvt-file__preview" data-upload-preview="fileInputId" id="file-description">
        No file selected
    </div>
</div>
```

## Initialization

For each file input on the page:
- Use the `[data-upload-wrapper]` attribute to select the file input.
- Initialize the file input using the selected file input from the previous step (referenced as `selectedFileInput`):
    - `const newFileInput = new Rivet.FileInput(selectedFileInput)`

## Accessibility Requirements

The Rivet file input is built to follow the WAI-ARIA authoring standards. It is marked up with the appropriate ARIA attributes and uses the JavaScript included in rivet.js to implement the keyboard navigation and focus management required to meet the ARIA Authoring Practices standards. If you need to create the file input functionality in another framework/library like React, Angular, etc., please ensure that it meets the following accessibility requirements.

### Focus
- The file input button should have a visible :focus state

### Labeling
- The `input` element should have the attribute `aria-describedby`, which should match the `id` on `div.rvt-file__preview`

### Keyboard navigation
- Enter or Space = Activate file input dialog (when focused)