const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');
let config = defaults.__get__('config');

if (
  process.env.NODE_ENV === 'production' &&
  process.env.REACT_APP_API === 'prod' &&
  !('REACT_APP_API_KEY' in process.env)
) {
  throw new Error('REACT_APP_API_KEY must be set to create a production build');
}

config.optimization.splitChunks = {
  cacheGroups: {
    default: false,
  },
};

config.optimization.runtimeChunk = false;
