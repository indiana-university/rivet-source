module.exports = function (collection) {
  return collection.sort((a, b) => a.data.order - b.data.order);
}