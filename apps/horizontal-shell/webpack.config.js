const WebpackNotifierPlugin = require('webpack-notifier');
const nrwlConfig = require('@nrwl/react/plugins/webpack.js'); // require the main @nrwl/react/plugins/webpack configuration function.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AtriomPlugin = require('atriom-plugin');
const path = require('path');

module.exports = (config, context) => {
  nrwlConfig(config); // first call it so that it @nrwl/react plugin adds its configs,

  // then override your config.
  return {
    ...config,
    entry: './src/main',
    mode: 'development',
    // devServer: {
    //   static: {
    //     directory: path.join(__dirname, 'dist'),
    //   },
    //   port: 4200,
    // },
    output: {
      publicPath: 'auto',
    },
    optimization: {
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
      new WebpackNotifierPlugin({ title: 'Frontend Project build completed' }),
      //new BundleAnalyzerPlugin(),
      new AtriomPlugin({
        filename: 'atriom',
        outputPath: path.join(__dirname, '../'),
      }),
      new ModuleFederationPlugin({
        // best place to understand Module Federation config https://github.com/webpack/webpack/pull/10960
        name: 'AppShell',
        remotes: {
          Catalog: 'Catalog@http://localhost:4201/remoteEntry.js',
          //MyAccount: 'MyAccount@http://localhost:3004/remoteEntry.js',
          //SignIn: 'SignIn@http://localhost:3003/remoteEntry.js',
          // SignIn: "SignIn@http://d21ugy3cbs42qx.cloudfront.net/signin/remoteEntry.js"
        },
        shared: {
          react: {
            singleton: true,
          },
          'react-dom': {
            singleton: true,
          },
          'react-router-dom': {
            singleton: true,
          },
          '@material-ui/core': {
            singleton: true,
          },
          '@material-ui/icons': {
            singleton: true,
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
  };
};
