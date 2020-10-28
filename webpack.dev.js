const path = require("path");
const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");
const { server } = require("./params");

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.join(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss$|css)/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    },
    extensions: ["*", ".js", ".jsx"]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "public/"),
    host: server.host,
    port: 8080,
    hotOnly: true
  }
});
