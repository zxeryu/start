module.exports = {
  presets: [require("@babel/preset-typescript").default],
  plugins: [
    ["@babel/plugin-transform-typescript", { allowNamespaces: true, isTSX: true }],
    ["@babel/plugin-transform-react-jsx"],
  ],
};
