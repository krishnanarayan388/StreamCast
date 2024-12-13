// import Podcast from "../model/podcast";
const { default: mongoose } = require("mongoose");
const Podcast = require("../model/podcast");
const User = require("../model/user");

exports.getAllPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find({}).sort({ createdAt: -1 });
    res.status(200).json({ podcasts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getPodcastById = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    res.status(200).json({ podcast });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createPodcast = async (req, res) => {
  const podcast = req.body;
  const newPodcast = new Podcast(podcast);
  try {
    await newPodcast.save();
    res.status(200).json(newPodcast);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.updatePodcast = async (req, res) => {
  const { id: _id } = req.params;
  const podcast = req.body;

  const updatedPodcast = await Podcast.findByIdAndUpdate(
    _id,
    { ...podcast, _id },
    {
      new: true,
    }
  );

  res.json(updatedPodcast);
};

exports.deletePodcast = async (req, res) => {
  const { id } = req.params;
  await Podcast.findByIdAndRemove(id);
  res.json({ message: "Podcast deleted successfully." });
};

exports.searchPodcast = async (req, res) => {
  const searchQuery  = req.params.query;
  console.log(searchQuery, "  Is search query ");

  try {
    // if Podcast title.includes(searchQuery) then return that podcast

    const podcasts = await Podcast.find({
      title: { $regex: `${searchQuery}`, $options: "i" },
    });

    res.json({ podcasts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Podcasts by userID

exports.getPodcastsByUserId = async (req, res) => {
  try {
    const podcasts = await Podcast.find({ userId: req.params.id });
    res.status(200).json({ podcasts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Podcasts by Category

exports.getPodcastsByCategory = async (req, res) => {
  try {
    const podcasts = await Podcast.find({ category: req.params.category });
    res.status(200).json({ podcasts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Favorite Podcasts by userID
exports.getFavPocastsbyUserID = async (req, res) => {
  // res.send("Get Favourite Podcasts by User ID");
  // return;
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).send(`No User with id: ${req.params.id}`);
    }
    const podcasts = await User.findOne(
      { _id: req.params.id },
      "favourites"
    ).populate("favourites");
    res.status(200).json({ podcasts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//  Add Podcast to Favourites in User Model
exports.addFavPodcast = async (req, res) => {
  const { userId, podcastId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User Id is required" });
  }
  if (!podcastId) {
    return res.status(400).json({ message: "Podcast Id is required" });
  }

  // check whether UserId valid or not

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).send(`No User with id: ${userId}`);
  }

  // check whether PodcastId valid or not

  if (!mongoose.Types.ObjectId.isValid(podcastId)) {
    return res.status(404).send(`No Podcast with id: ${podcastId}`);
  }

  const NewUser = await User.findByIdAndUpdate(
    userId,
    { $push: { favourites: podcastId } },

    {
      new: true,
      
    }
  )

  res.json(NewUser);
};


// Remove Podcast from Favourites in User Model
exports.removeFavPodcast = async (req, res) => {
  try{
    const { userId, podcastId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User Id is required" });
    }
    if (!podcastId) {
      return res.status(400).json({ message: "Podcast Id is required" });
    }

    // check whether UserId valid or not

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send(`No User with id: ${userId}`);
    }

    // check whether PodcastId valid or not

    if (!mongoose.Types.ObjectId.isValid(podcastId)) {

      return res.status(404).send(`No Podcast with id: ${podcastId}`);
    }

    // Remove Podcast from Favourites in User Model

    const NewUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { favourites: podcastId } },
      {
        new: true,
      }
    );

    res.json(NewUser);

    

  }catch(error){
    res.status(404).json({ message: error.message });
  }

}


// Convert first letter of string to uppercase
exports.capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};


// Get Podcasts by Category
exports.getPodcastsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const capitalizedCategory = this.capitalize(category.toLowerCase());
    const podcasts = await Podcast.find({ category: capitalizedCategory });
    res.status(200).json({ podcasts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}



// Podcasts View Count Increment

exports.incrementViewCount = async (req, res) => {
  try {
    // User Id and Podcast Id
    const { userId, podcastId } = req.body;
    // Check whether User Id is valid or not
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send(`No User with id: ${userId}`);
    }
    // Check whether Podcast Id is valid or not
    if (!mongoose.Types.ObjectId.isValid(podcastId)) {
      return res.status(404).send(`No Podcast with id: ${podcastId}`);
    }
    // Check whether User has already viewed the podcast or not

    // If userId is added in userViews array then return true else false
    const isUserViewed = await Podcast.findOne({
      _id: podcastId,
      userViews: userId,
    });

    if (isUserViewed) {
      return res.status(400).json({ message: "User already viewed the podcast" });
    }

    // If user has not viewed then add Product Id in userViews array
    const updatedPodcast = await Podcast.findByIdAndUpdate(
      podcastId,
      { $push: { userViews: userId } },
      { new: true }
    );

    res.status(200).json({ updatedPodcast });




  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// Get Podcasts by Total Views

exports.getPodcastsByPopularity = async (req, res) => {
  try {

    // Return top 10  Podcasts by Total Views 
    const podcasts = await Podcast.find().sort({ userViews: -1 }).limit(7);
    res.status(200).json({ podcasts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
