var path = require("path");
const params = require("./params");
const { server } = require("./params");

module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: path.join(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"],
          plugins: ["@babel/plugin-transform-runtime"]
        }
      },
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
    // historyApiFallback: true,
    // publicPath: "http://localhost:3000/dist/",
    historyApiFallback: true,
    contentBase: path.join(__dirname, "public/"),
    host: server.host,
    port: 8080,
    hotOnly: true
  }
};
