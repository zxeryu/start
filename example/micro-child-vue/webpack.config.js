const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const name = "child-vue";
module.exports = {
  entry: {
    app: "./src/index.ts",
  },
  output: {
    filename: "build.js",

    library: `${name}-[name]`,
    libraryTarget: "umd",
    jsonpFunction: `webpackJsonp_${name}`,
    globalObject: "window",
  },
  resolve: {
    extensions: [".js", ".ts", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(ts|js)$/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 3102,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
