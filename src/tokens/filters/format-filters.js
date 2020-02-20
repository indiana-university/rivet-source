const isBreakpoint = {
  name: 'isBreakpoint',
  matcher: function(prop) {
    return prop.attributes.category === 'breakpoint';
  }
};

const isColor = {
  name: 'isColor',
  matcher: function(prop) {
    return prop.attributes.category === 'color';
  }
};

const isTypeScale = {
  name: 'isTypeScale',
  matcher: function(prop) {
    return prop.attributes.category === 'ts';
  }
};

const isWidth = {
  name: 'isWidth',
  matcher: function(prop) {
    return prop.attributes.category === 'width';
  }
};

const isZIndex = {
  name: 'isZIndex',
  matcher: function(prop) {
    return prop.attributes.category === 'z-index';
  }
};

module.exports = {
  isBreakpoint,
  isColor,
  isTypeScale,
  isWidth,
  isZIndex
};
