const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

// hashing middleware
function hashThePassword(next) {
  const user = this;
  if (!user.isModified("password")) next();
  bcrypt.hash(user.password, 10, (err, newHashedPass) => {
    if (err) next(err);
    user.password = newHashedPass;
    next();
  });
}

function createToken(user) {
  return Jwt.sign({ id: user._id }, process.env.JWT_SECRET);
}

async function verifyToken(token) {
  return new Promise((resolve, reject) => {
    Jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
}

async function generateTokenForUser(req, res, next) {
  const token = createToken(req.user);
  res
    .cookie("w_auth", token)
    .status(200)
    .redirect(`http://localhost:3000/${req.user.username}`);
}

module.exports = {
  hashThePassword,
  createToken,
  verifyToken,
  generateTokenForUser,
};
