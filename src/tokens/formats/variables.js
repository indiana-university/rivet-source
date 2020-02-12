module.exports = {
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
