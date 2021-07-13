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

const isFontSize = {
  name: 'isFontSize',
  matcher: function(prop) {
    return prop.attributes.category === 'font-size';
  }
};

const isLineHeight = {
  name: 'isLineHeight',
  matcher: function(prop) {
    return prop.attributes.category === 'line-height';
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
  isFontSize,
  isLineHeight,
  isTypeScale,
  isWidth,
  isZIndex
};
