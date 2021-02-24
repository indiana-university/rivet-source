const core = require('@actions/core');
const fs = require('fs');

try {
  const data = fs.readFileSync('./package.json');
  const package = JSON.parse(data);
  const version = package.version;

  core.setOutput('version', version);
} catch (error) {
  core.setFailed(error.message);
}