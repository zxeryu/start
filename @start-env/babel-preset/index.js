module.exports = function () {
  return {
    presets: [require.resolve("@babel/preset-typescript")],
    plugins: [
      ["@babel/plugin-transform-typescript", { allowNamespaces: true, isTSX: true }],
      ["@babel/plugin-transform-react-jsx"],
    ],
  };
};
