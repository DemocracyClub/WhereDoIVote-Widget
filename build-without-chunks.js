const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');
let config = defaults.__get__('config');

const allowed_brands = ['DC', 'EC'];
if (!allowed_brands.includes(process.env.REACT_APP_BRAND)) {
  throw new Error(`REACT_APP_BRAND must be one of ${JSON.stringify(allowed_brands)}`);
}

if (
  process.env.NODE_ENV === 'production' &&
  process.env.REACT_APP_API === 'prod' &&
  !('REACT_APP_API_KEY' in process.env)
) {
  throw new Error('REACT_APP_API_KEY must be set to create a production build');
}

if (process.env.NODE_ENV === 'production' && !('PUBLIC_URL' in process.env)) {
  throw new Error('PUBLIC_URL must be set to create a production build');
}

config.optimization.splitChunks = {
  cacheGroups: {
    default: false,
  },
};

config.optimization.runtimeChunk = false;
