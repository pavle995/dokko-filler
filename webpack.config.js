const path = require('path');
const { merge } = require('webpack-merge');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');

module.exports = (env) => {
  const isProd = env && env.production;

  const commonConfig = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? 'js/[name].[contenthash:8].js' : 'bundle.js',
      clean: true,
    },
    resolve: {
      alias: {
        '~components': path.resolve(__dirname, './src/components'),
        '~shared-components': path.resolve(
          __dirname,
          './src/shared-components'
        ),
        '~pages': path.resolve(__dirname, './src/pages'),
        '~hooks': path.resolve(__dirname, './src/hooks'),
        '~api': path.resolve(__dirname, './src/api'),
      },
      extensions: ['.js', '.jsx', '.json'],
    },
  };

  return isProd
    ? merge(commonConfig, prodConfig)
    : merge(commonConfig, devConfig);
};
