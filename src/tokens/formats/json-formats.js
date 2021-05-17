const jsonVariables = {
  name: 'rvt/json/variables',
  formatter: function(dictionary) {
    const allProperties = dictionary.allProperties;

    // Wrapper is the string that will be built into the final output
    let wrapper = `{\n`;

    // Output holds the output from each category loop
    let output = ``;
    Object.keys(dictionary.properties).forEach((item, index) => {
      output += `  ${JSON.stringify(item)}:[\n`;

      // Set firstItem to true to check for first item in loop
      let firstItem = true;

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
          line += firstItem === true ? `    {\n` : `,\n    {\n`;
          line += `      "name": ${JSON.stringify(path)},\n`;
          line += `      "value": ${JSON.stringify(value)}\n`;
          line += `    }`;
          output += line;

          // Set firstItem to false since loop has advanced beyond first item
          firstItem = false;
        }
      }

      // If last item, do not add final comma
      output +=
        Object.keys(dictionary.properties).length - 1 === index
          ? `\n  ]\n`
          : `\n  ],\n`;
    });
    wrapper += output;
    wrapper += `}`;
    return wrapper;
  }
};

module.exports = {
  jsonVariables
};
