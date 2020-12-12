const mongoose = require("mongoose");

const imageScheme = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  tags: [
    {
      type: String,
    },
  ],
  path: {
    type: String,
    required: true,
  },
});

const Room = mongoose.model("Image", imageScheme);

module.exports = Room;
