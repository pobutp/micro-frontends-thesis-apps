const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const nrwlConfig = require('@nrwl/react/plugins/webpack.js'); // require the main @nrwl/react/plugins/webpack configuration function.
const deps = require('../../package.json').dependencies;

module.exports = (config) => {
  nrwlConfig(config); // first call it so that it @nrwl/react plugin adds its configs,

  return {
    ...config,
    mode: 'development',
    output: {
      uniqueName: 'horizontalOrdersMfe',
      publicPath: 'auto',
    },
    devServer: {
      ...config.devServer,
      liveReload: false,
    },
    optimization: {
      minimize: false,
      runtimeChunk: false,
    },
    stats: {
      chunks: true,
      modules: false,
      chunkModules: true,
      chunkOrigins: true,
    },
    plugins: [
      ...config.plugins,
      new ModuleFederationPlugin({
        name: 'horizontalOrdersMfe',
        filename: 'remoteEntry.js',
        exposes: {
          './web-components': 'apps/horizontal-orders-mfe/src/bootstrap.tsx',
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            eager: true,
            requiredVersion: deps.react,
          },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-dom'],
          },
        },
      }),
    ],
  };
};
