const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    default: "",
  },
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Podcasts",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
