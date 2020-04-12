const { join } = require("lodash");
module.exports = {
  test() {
    const arr = ["lerna", "start-browser"];

    console.log(join(arr, ","));
    console.log("second");
    console.log("third");
    console.log("fourth");
    console.log("demo5");
    console.log("demo6");
    console.log("demo7");
  },
};
