const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    podcasts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Podcasts",
      },
    ],
  },
  { timestamps: true }
);

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;

// Get user playlists
