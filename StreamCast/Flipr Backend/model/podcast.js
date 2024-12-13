const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
    },
    userId: {
      type: String,
    },
    userViews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Podcast = mongoose.model("Podcasts", podcastSchema);

module.exports = Podcast;
