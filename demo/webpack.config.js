const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const webpack = require("webpack");

const parts = require("./webpack.parts");

const PATHS = {
  app: path.join(__dirname, "app"),
  build: path.join(__dirname, "build"),
};

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: "[name].[chunkhash].js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo",
      }),
      new webpack.NamedModulesPlugin(),
    ],
  },
  parts.loadJavaScript({ include: PATHS.app }),
]);

const isVendor = ({ resource }) => /node_modules/.test(resource);

const productionConfig = merge([
  parts.extractCSS({
    use: "css-loader",
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: "[name].[ext]",
    },
  }),
  {
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: isVendor,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
      }),
    ],
  },
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
  parts.loadImages(),
]);

module.exports = env => {
  if (env === "production") {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
