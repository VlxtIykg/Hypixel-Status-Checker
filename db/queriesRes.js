const fs = require("fs");
const TOML = require("@ltd/j-toml");
const path = require("path");
module.exports = TOML.parse(fs.readFileSync(`${__dirname}/queries.toml`, "utf8"), { joiner: "\n"})