const componentPage = document.querySelector('[data-component]')

if (componentPage) {

  // Get elements

  const previewTab = componentPage.querySelector('[data-tab="preview"]')
  const htmlTab = componentPage.querySelector('[data-tab="html"]')
  const previewButton = componentPage.querySelector('[data-preview-button]')
  const copyCodeButton = componentPage.querySelector('[data-copy-code-button]')
  const copyCodeButtonText = copyCodeButton.querySelector('span')
  const previewPane = componentPage.querySelector('[data-pane-preview]')
  const htmlPane = componentPage.querySelector('[data-pane-html]')
  const previews = Array.from(previewPane.querySelectorAll('[data-variant]'))
  const codeBlocks = Array.from(htmlPane.querySelectorAll('[data-html]'))
  const eventInspector = componentPage.querySelector('[data-event-inspector]')

  // Show first variant preview

  showPreview(previews[0].dataset.variant)

  // Scroll sidebar to selected component

  document.querySelector(`li a.current`).scrollIntoView({ block: 'center' })

  // Define function to show preview with given ID

  function showPreview(id) {

    // Hide all previews

    previews.forEach(preview => preview.style.display = 'none')
    codeBlocks.forEach(block => block.style.display = 'none')
    document.querySelectorAll('[data-variant-select]').forEach(select => select.classList.remove('current'))

    // Show preview with the given ID

    const preview = document.querySelector(`[data-variant="${id}"]`)
    const codeBlock = document.querySelector(`[data-html="${id}"]`)
    preview.style.display = 'block'
    codeBlock.style.display = 'grid'
    previewButton.href = preview.src
    copyCodeButton.dataset.target = preview.dataset.variant
    document.querySelector(`[data-variant-select="${preview.dataset.variant}"]`).classList.add('current')

  }

  // Define function to copy code block

  function copyExample(copyTarget) {
    const range = document.createRange()
    range.selectNode(copyTarget)
    window.getSelection().addRange(range)

    try {
      document.execCommand('copy')

      copyCodeButtonText.textContent = 'Copied!'

      setTimeout(() => {
        copyCodeButtonText.textContent = 'Copy source code'
      }, 3000)
    } catch (error) {
      console.log(error)
    }

    // Removes the current selection so that subsequent copy actions work
    window.getSelection().removeAllRanges();
  }

  // Add event listeners to tabs

  previewTab.addEventListener('click', event => {
    event.preventDefault()

    htmlPane.style.display = 'none'
    htmlTab.classList.remove('current')

    previewPane.style.display = 'block'
    previewTab.classList.add('current')

    copyCodeButton.style.display = 'none'
    previewButton.style.display = 'inline'
  })

  htmlTab.addEventListener('click', event => {
    event.preventDefault()

    previewPane.style.display = 'none'
    previewTab.classList.remove('current')

    htmlPane.style.display = 'block'
    htmlTab.classList.add('current')

    previewButton.style.display = 'none'
    copyCodeButton.style.display = 'inline'
  })

  // Add event listeners to sidebar variant links

  document.querySelectorAll('[data-variant-select').forEach(select => {
    select.addEventListener('click', event => {
      event.preventDefault()

      showPreview(event.target.dataset.variantSelect)
    })
  })

  // Add event listener to copy code button

  copyCodeButton.addEventListener('click', event => {
    event.preventDefault()

    const codeBlockId = copyCodeButton.dataset.target
    const copyTarget = componentPage.querySelector(`[data-html="${codeBlockId}"] code`)

    copyExample(copyTarget)
  })

  // Add event listeners for component custom event inspector

  if (eventInspector) {
    const componentEvents = eventInspector.dataset.eventInspector.split(',').slice(0, -1)

    componentEvents.forEach(componentEvent => {
      previews.forEach(iframe => {
        iframe.contentDocument.addEventListener(componentEvent, event => {
          eventInspector.textContent = componentEvent
          eventInspector.style.display = 'block'
          setTimeout(() => {
            eventInspector.style.display = 'none'
          }, 3000)
        })
      })
    })
  }

}