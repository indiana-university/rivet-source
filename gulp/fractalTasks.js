const fractal = require('../fractal.config')

// Keep a reference to the fractal CLI console utility
const logger = fractal.cli.console;

function fractalStart() {
  const server = fractal.web.server({
    sync: true
  });
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
}

function fractalHeadless() {
  const server = fractal.web.server({
    sync: true
  });
  fractal.web.set('server.syncOptions', {
    open: false
  });
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
}

function fractalBuild() {
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) =>
    logger.update(`Exported ${completed} of ${total} items`, 'info')
  );
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
    logger.success('Fractal build completed!');
  });
}

module.exports = { fractalStart, fractalHeadless, fractalBuild }