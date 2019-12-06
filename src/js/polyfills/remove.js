/**
 * ChildNode.remove() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove#Polyfill
 */
(function (arr) {
  arr.forEach(function (item) {
    /* eslint-disable */
    if (item.hasOwnProperty('remove')) {
      return;
    }
    /* eslint-enable */
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        if (this.parentNode === null) {
          return;
        }
        this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);