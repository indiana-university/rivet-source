const package = require('../package.json');

// Create the string for the verion number banner.
var sassBannerText = `// ${package.name} - @version ${package.version}

`;

module.exports = sassBannerText;
