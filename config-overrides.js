const path = require('path');

module.exports = function override(config, env) {
  // Customize the webpack config
  if (env === 'development') {
    config.output.path = path.join(__dirname, 'frontend-web', 'public');
  }
  return config;
};
