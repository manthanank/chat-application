const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.registerTOKEN_SECRET, { expiresIn: "30d" });
};

module.exports = generateToken;
