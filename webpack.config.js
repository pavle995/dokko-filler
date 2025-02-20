// webpack.config.js
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { merge } = require('webpack-merge');
const developmentConfig = require('./webpack.dev');
const productionConfig = require('./webpack.prod');

const isProd = Boolean(process.env.NODE_ENV === 'production');
const isDev = Boolean(process.env.NODE_ENV === 'development');

const commonConfig = (env) => {
  return {
    mode: process.env.NODE_ENV,
    bail: isProd,
    context: path.resolve(__dirname, ''),
    devtool: isProd ? 'cheap-module-source-map' : 'source-map',
    entry: './src/index.js',
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'entry',
                    corejs: 3,
                  },
                ],
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic',
                  },
                ],
              ],
              sourceType: 'unambiguous',
              plugins: [
                '@babel/plugin-transform-runtime',
                'babel-plugin-styled-components',
                isDev && 'react-refresh/babel',
              ].filter(Boolean),
            },
          },
        },
        {
          test: /\.css$/u,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
          ],
          type: 'javascript/auto',
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    optimization: {
      emitOnErrors: false,
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
        '~context': path.resolve(__dirname, './src/context'),
        '~utils': path.resolve(__dirname, './src/utils'),
      },
      extensions: ['.js', '.jsx', '.json'],
      symlinks: true,
    },
    stats: 'minimal',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
      new ESLintPlugin({
        quiet: true,
      }),
      new WebpackManifestPlugin(),
      new MiniCssExtractPlugin({
        filename: isDev ? 'css/vendors.css' : 'css/[name].[contenthash:8].css',
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: 'public/assets', to: 'assets' }],
      }),
    ],
  };
};

module.exports = (env) => {
  if (isDev) {
    return merge(commonConfig(env), developmentConfig(env));
  }

  if (isProd) {
    return merge(commonConfig(env), productionConfig(env));
  }

  return commonConfig(env);
};
