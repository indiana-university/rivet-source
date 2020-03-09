const jsonVariables = {
  name: 'rvt/json/variables',
  formatter: function(dictionary) {
    const allProperties = dictionary.allProperties;
    const properties = dictionary.properties;
    // eslint-disable-next-line prefer-const
    let categories = Object.keys(properties);

    // Wrapper is the string that will be built into the final output
    let wrapper = ``;
    wrapper += `{\n`;

    // Output holds the output from each category loop
    let output = ``;
    categories.forEach(function(item) {
      output += `  ${JSON.stringify(item)}:[\n`;

      // Set counter to check for first item in output loop
      let counter = 0;

      // Loop through allProperties to find entries which match the category
      for (const key in Object.entries(allProperties)) {
        const category = allProperties[key].attributes.category;
        const value = allProperties[key].value;

        // The path is the fully-articulated property name as an array
        // Combine the array (kebab-case) or output item if single item
        const path =
          allProperties[key].path.length > 1
            ? allProperties[key].path.join('-')
            : allProperties[key].path[0];

        // Check that the category matches the item
        if (category === item) {
          // Increase counter
          counter += 1;

          /**
           * Build json output string for item
           *
           *  {
           *      "name": "fully-articulated property name",
           *      "value": "value"
           *  }
           */

          let line = ``;

          // If first item, do not add initial comma
          line += counter === 1 ? `    {\n` : `,\n    {\n`;
          line += `      "name": ${JSON.stringify(path)},\n`;
          line += `      "value": ${JSON.stringify(value)}\n`;
          line += `    }`;
          output += line;
        }
      }

      // If last item, do not add final comma
      output +=
        categories[categories.length - 1] === item ? `\n  ]\n` : `\n  ],\n`;
    });
    wrapper += output;
    wrapper += `}`;
    return wrapper;
  }
};

module.exports = {
  jsonVariables
};
