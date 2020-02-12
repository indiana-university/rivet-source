module.exports = {
  name: 'rvt/scss/map-simple-desc',
  formatter: function(dictionary) {
    const allProperties = dictionary.allProperties;
    let output = '';
    output += `$${this.mapName || 'tokens'}: (\n`;
    output += allProperties
      .map(function(prop) {
        let line = '';
        if (prop.comment) {
          line += `  // ${prop.comment}\n`;
        }
        line += `  '${prop.attributes.type}-${prop.attributes.item}': ${prop.value}`;
        return line;
      })
      .join(`,\n`);
    output += `\n);\n`;
    return output;
  }
};