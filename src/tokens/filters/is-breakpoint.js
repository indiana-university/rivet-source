module.exports = {
  name: 'isBreakpoint',
  matcher: function(prop) {
    return prop.attributes.category === 'breakpoint';
  }
};
