const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const OUTPUT_DIR = 'build';

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, OUTPUT_DIR),
    filename: "output.js"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".tsx", ".ts", ".mjs", ".js", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },

  plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack App",
        filename: "index.html",
        template: "./index.html"
      }),
  ],

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //   react: "React",
  //   "react-dom": "ReactDOM",
  // },
};
