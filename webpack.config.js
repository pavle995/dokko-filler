// webpack.config.js
const path = require("path");
const { merge } = require("webpack-merge");
const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");

const commonConfig = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash:8].js",
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ico$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["react-refresh/babel"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    alias: {
      "~components": path.resolve(__dirname, "./src/components"),
      "~shared-components": path.resolve(__dirname, "./src/shared-components"),
      "~pages": path.resolve(__dirname, "./src/pages"),
      "~hooks": path.resolve(__dirname, "./src/hooks"),
      "~api": path.resolve(__dirname, "./src/api"),
      "~context": path.resolve(__dirname, "./src/context"),
      "~utils": path.resolve(__dirname, "./src/utils"),
    },
    extensions: [".js", ".jsx", ".json"],
  },
};

module.exports = (env) => {
  const isProd = env && env.production;
  return isProd
    ? merge(commonConfig, prodConfig)
    : merge(commonConfig, devConfig);
};
