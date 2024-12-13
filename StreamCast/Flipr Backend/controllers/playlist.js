const { default: mongoose } = require("mongoose");
const Playlist = require("../model/Playlists");

// get Playlist by User Id
exports.getPlaylistByUserId = async (req, res) => {
    const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User Id is required" });
  }

  // check whether UserId valid or not

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).send(`No User with id: ${userId}`);
  }

  const playlist = await Playlist.find({ userId: userId }).populate("podcasts");

  res.status(200).json(playlist);
};

// Add Podcast to Playlist
exports.addPodcastToPlaylist = async (req, res) => {
  const { playlistId, podcastId } = req.body;

  if (!playlistId) {
    return res.status(400).json({ message: "Playlist Id is required" });
  }
  if (!podcastId) {
    return res.status(400).json({ message: "Podcast Id is required" });
  }

  // check whether PlaylistId valid or not

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    return res.status(404).send(`No Playlist with id: ${playlistId}`);
  }

  // check whether PodcastId valid or not

  if (!mongoose.Types.ObjectId.isValid(podcastId)) {
    return res.status(404).send(`No Podcast with id: ${podcastId}`);
  }


  // Push Podcast to podcasts in Playlist Model if not already present in it

  const NewPlaylist = await Playlist.findOneAndUpdate(
    { _id: playlistId, podcasts: { $ne: podcastId } },
    { $push: { podcasts: podcastId } },
    { new: true }
  );


  res.json(NewPlaylist);
};

// Delete Podcast from Playlist
exports.removePodcastFromPlaylist = async (req, res) => {
  const { playlistId, podcastId } = req.body;

  if (!playlistId) {
    return res.status(400).json({ message: "Playlist Id is required" });
  }
  if (!podcastId) {
    return res.status(400).json({ message: "Podcast Id is required" });
  }

  // check whether PlaylistId valid or not

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    return res.status(404).send(`No Playlist with id: ${playlistId}`);
  }

  // check whether PodcastId valid or not

  if (!mongoose.Types.ObjectId.isValid(podcastId)) {
    return res.status(404).send(`No Podcast with id: ${podcastId}`);
  }

  const NewPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    { $pull: { podcasts: podcastId } },

    {
      new: true,
    }
  );

  res.json(NewPlaylist);
};

// Create Playlist
exports.createPlaylist = async (req, res) => {
    const { title, userId , authorName , podcastId } = req.body;
    
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    if (!userId) {
        return res.status(400).json({ message: "User Id is required" });
    }
    if (!authorName) {
        return res.status(400).json({ message: "Author Name  is required" });
    }
    
    // check whether UserId valid or not
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).send(`No User with id: ${userId}`);
    }
    
    const NewPlaylist = new Playlist({
        title,
        userId,
        authorName,
        podcasts: [podcastId]
    });
    
    try {
        await NewPlaylist.save();
        res.status(201).json(NewPlaylist);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    }



  // Get all playlists
exports.getAllPlayLists = async (req, res) => {

    try {
        const playlists = await Playlist.find();
        res.status(200).json(playlists);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



// Get Playlist by Id

exports.getPlaylistById = async (req, res) => {

  try {
      const playlist = await Playlist.findById(req.params.id).populate("podcasts");
      res.status(200).json(playlist);
  }
  catch (error) {
      res.status(404).json({ message: error.message });
  }
}

