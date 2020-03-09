const mapSimpleDesc = {
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

const mapSimple = {
  name: 'rvt/scss/map-simple',
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
        line += `  '${prop.attributes.type}': ${prop.value}`;
        return line;
      })
      .join(`,\n`);
    output += `\n);\n`;
    return output;
  }
};

const variables = {
  name: 'rvt/scss/variables',
  formatter: function variablesWithPrefix(dictionary) {
    const properties = dictionary.allProperties;
    let output = '';
    output += properties
      .map(function(prop) {
        var to_ret_prop =
          `$${prop.name}: ` +
          (prop.attributes.category === 'asset'
            ? '"' + prop.value + '"'
            : prop.value) +
          ';';

        if (prop.comment) {
          to_ret_prop = to_ret_prop.concat(` // ${prop.comment}`);
        }

        return to_ret_prop;
      })
      .filter(function(strVal) {
        return !!strVal;
      })
      .join('\n');
    output += '\n';
    return output;
  }
};

module.exports = {
  mapSimpleDesc,
  mapSimple,
  variables
};
