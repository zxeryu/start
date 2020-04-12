const { join } = require("lodash");
module.exports = {
  test() {
    const arr = ["lerna", "start-browser"];

    console.log(join(arr, ","));
  },
};
