var path = require("path");

module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: path.join(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"],
          plugins: ["@babel/plugin-transform-runtime"],
        },
      },
    ],
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
    extensions: ["*", ".js", ".jsx"],
  },
  devServer: {
    // historyApiFallback: true,
    // publicPath: "http://localhost:3000/dist/",
    historyApiFallback: true,
    contentBase: path.join(__dirname, "public/"),
    host: "0.0.0.0",
    port: 8080,
    hotOnly: true,
  },
};
