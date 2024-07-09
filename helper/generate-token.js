const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_KEY;

const generateToken = (data) => {
  const token = jwt.sign({ ...data }, secretKey, { expiresIn: "6h" });
  return token;
};

module.exports = { generateToken };
