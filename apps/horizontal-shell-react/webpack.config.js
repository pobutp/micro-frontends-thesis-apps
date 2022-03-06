const nrwlConfig = require('@nrwl/react/plugins/webpack.js'); // require the main @nrwl/react/plugins/webpack configuration function.
const { ModuleFederationPlugin } = require('webpack').container;
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const deps = require('../../package.json').dependencies;

module.exports = (config) => {
  nrwlConfig(config); // first call it so that it @nrwl/react plugin adds its configs,

  // then override your config.
  return {
    ...config,
    mode: 'development',
    output: {
      publicPath: 'auto',
    },
    devServer: {
      ...config.devServer,
      // HACK ALERT: during async module loading, webpack will try to load the remote entry from http://localhost:3000
      // and when it is not ready, it will start to redirect to http://localhost:5000 (local address) and throw the error,
      // We need to force compiler to resolve the remote script strictly from remote host http://localhost:3000.
      proxy: {
        'http://localhost:4202': 'http://localhost:4202',
      },
      liveReload: false,
    },
    optimization: {
      minimize: false, // debug
      chunkIds: 'named',
    },
    stats: {
      chunks: true,
      modules: false,
      chunkModules: true,
      chunkOrigins: true,
    },
    plugins: [
      ...config.plugins,
      //new BundleAnalyzerPlugin(),
      new ModuleFederationPlugin({
        // best place to understand Module Federation config https://github.com/webpack/webpack/pull/10960
        name: 'HorizontalShellReact',
        remotes: {
          // horizontalCatalogMfe:
          //   'horizontalCatalogMfe@http://localhost:4201/remoteEntry.js',
          HorizontalBasketMfe:
            'HorizontalBasketMfe@http://localhost:4202/remoteEntry.js',
        },
        shared: {
          ...deps,
          react: { singleton: true, eager: true, requiredVersion: deps.react },
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
