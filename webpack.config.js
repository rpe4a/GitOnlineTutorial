const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Path = {
  Entry: path.resolve("./src/index.js")
};

module.exports = {
  entry: Path.Entry,
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader", // compiles Sass to CSS
            options: {
              sourceMap: true,
              ident: "postcss",
              plugins: [
                require("postcss-sorting"),
                require("css-mqpacker"),
                require("autoprefixer")({
                  browsers: ["last 2 version", "IE 10"]
                })
              ]
            }
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require("cssnano"),
      cssProcessorOptions: { discardComments: { removeAll: true } }
    })
  ]
};
