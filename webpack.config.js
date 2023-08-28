const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: {
    script: "./index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images",
            },
          },
        ],
      },
    ],
  },
  devServer: {
    client: {
      overlay: true,
    },
    hot: true,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: ["*.html"],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      DOMAIN: JSON.stringify(process.env.DOMAIN),
    }),
    new Dotenv(),
  ],
};
