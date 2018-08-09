/**
 *
 * @param {HTMLElement} element
 * An HTML Element used to emmit the event from
 * @param {String} attributeId
 * A data attribute with a unique value
 * @param {String} eventName
 * A unique name for the custom event
 */
var fireCustomEvent = function (element, attributeId, eventName) {
  var event = new CustomEvent(eventName, {
    bubbles: true,
    detail: {
      name: function () {
        return element.getAttribute(attributeId);
      }
    }
  });

  // Distpatch the event
  element.dispatchEvent(event);
}
