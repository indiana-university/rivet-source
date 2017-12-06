# File input
The file input component is a styled version of the native HTML file input. It can be used to allow users to attach files to a form for upload on submission.

## Implementation notes
Each `.rvt-file` on the page needs to have a unique `id` attribute for the file input. This this `id` needs to match the `data-upload` attribute on the `.rvt-file wrapper`, the `"`for`"` attribute on the file input, and the `data-file-preview` attribute on the `.rvt-file__preview` div.

### Multiple files
The uploader also works with the `multiple` attribute on the file input. The `.rvt-file__preview` container will show the number of files attached to the input if multiples are uploaded.

### Rivet button styles
Any of the Rivet button versions/classes can be used on the label element to make the file uploader look like a Rivet button. See the docs for available [button variations](https://rivet.uits.iu.edu/components/forms/buttons/).
