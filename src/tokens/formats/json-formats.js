const jsonVariables = {
  name: 'rvt/json/variables',
  formatter: function(dictionary) {
    const allProperties = dictionary.allProperties;
    const properties = dictionary.properties;
    // eslint-disable-next-line prefer-const
    let categories = Object.keys(properties);
    let output = ``;
    output += `{\n`;
    let wrapper = ``;
    categories.forEach(function(item) {
      wrapper += `  ${JSON.stringify(item)}:[\n`;
      // Get all entries with category and push to new object/array
      for (const key in Object.entries(allProperties)) {
        const category = allProperties[key].attributes.category;
        const propValue = allProperties[key].value;
        const propPath =
          allProperties[key].path.length > 1
            ? allProperties[key].path.join('-')
            : allProperties[key].path[0];
        if (category === item) {
          let line = ``;
          line += `    {\n`;
          line += `      "name": ${JSON.stringify(propPath)},\n`;
          line += `      "value": ${JSON.stringify(propValue)}\n`;
          // If item index < array length ? `    },\n` : `    }\n`;
          line += `    },\n`;
          wrapper += line;
        }
      }
      wrapper += `  ],\n`;
    });
    output += wrapper;
    output += `}`;
    console.log(output);
    return output;
  }
};

module.exports = {
  jsonVariables
};
