const path = require("path");
const name = "child-react";
module.exports = {
  entry: {
    app: "./src/index.tsx",
  },
  output: {
    filename: "build.js",

    library: `${name}-[name]`,
    libraryTarget: "umd",
    jsonpFunction: `webpackJsonp_${name}`,
    globalObject: "window",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "babel-loader",
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 3101,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
