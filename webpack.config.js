const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
let mode = "development";

if (process.env.NODE_ENV === "production") {
  mode = "production";
}

module.exports = {
  mode: mode,
  entry: {
    main: "./src/index.js",
    "production-dependencies": ["phaser"],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[name][ext][query]",
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|ogg|mp3|wav)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/index.html"),
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: path.resolve(__dirname, "src/images/"),
          to: path.resolve(__dirname, "dist/images/"),
        },
      ],
    }),
    new MiniCssExtractPlugin(),
    // new HtmlWebpackPlugin({
    //   template: "./src/index.html",
    // }),
  ],
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  optimization: {
    splitChunks: {
      name: "production-dependencies",
      filename: "production-dependencies.bundle.js",
    },
  },
};
