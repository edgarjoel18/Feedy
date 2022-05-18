// file is used to return which keys to return based on whether we are in
// production or development
if (process.env.NODE_ENV === "production") {
  // return production set of keys
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
