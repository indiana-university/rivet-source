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
      let counter = 0;
      for (const key in Object.entries(allProperties)) {
        const category = allProperties[key].attributes.category;
        const propValue = allProperties[key].value;
        const propPath =
          allProperties[key].path.length > 1
            ? allProperties[key].path.join('-')
            : allProperties[key].path[0];
        if (category === item) {
          counter += 1;
          let line = ``;
          line += counter === 1 ? `    {\n` : `,\n    {\n`;
          line += `      "name": ${JSON.stringify(propPath)},\n`;
          line += `      "value": ${JSON.stringify(propValue)}\n`;
          line += `    }`;
          wrapper += line;
        }
      }
      wrapper +=
        categories[categories.length - 1] === item ? `\n  ]\n` : `\n  ],\n`;
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
