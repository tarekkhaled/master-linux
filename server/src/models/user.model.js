const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { hashThePassword } = require("../../utils/sec");

const userScheme = mongoose.Schema({
  username: {
    type: String,
    unique: 1,
    required: true,
  },
  email: {
    type: String,
    unique: 1,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
});

userScheme.pre("save", hashThePassword);

userScheme.methods.checkPassword = function (notHashedPassword) {
  const hashedPassword = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(notHashedPassword, hashedPassword, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};
module.exports = mongoose.model("User", userScheme);
