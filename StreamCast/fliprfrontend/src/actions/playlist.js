import axios from "axios";

const API2 = "https://fipr-backend.onrender.com/api";
const API1 = "http://localhost:3001/api";
// const API2 = "https://fipr-backend.onrender.com/api";

// Get Playlist by UserId
export const getPlaylist = async (userId) => {
  try {
    const res = await axios.get(`${API2}/playlist/get-playlists/${userId}`);
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message: "Playlist Fetched Successfully",
      };
    }
  } catch (error) {
    console.log(error, " error hai");
    return {
      data: null,
      status: 500,
      error: true,
      message: error?.response?.data?.error || "Something went wrong",
    };
  }
};

// Create Playlist
export const createPlaylistInDatabase = async (data) => {
  try {
    const res = await axios.post(`${API2}/playlist/create-playlist`, data);
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message:
          res.status == 200
            ? "Playlist Added Successfully"
            : "Something went wrong",
      };
    }
  } catch (error) {
    console.log(error, " error hai");
    return {
      data: null,
      status: 500,
      error: true,
      message:
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Something went wrong",
    };
  }
};

// Add Podcast to Playlist
export const addPodcastToPlaylist = async (data) => {
  try {
    const res = await axios.put(`${API2}/playlist/add-to-playlist`, data);
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message:
          res.status == 200
            ? "Podcast Added Successfully"
            : "Something went wrong",
      };
    }
  } catch (error) {
    console.log(error, " error hai");
    return {
      data: null,
      status: 500,
      error: true,
      message:
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Something went wrong",
    };
  }
};

// Remove Podcast from Playlist
export const removePodcastFromPlaylist = async (data) => {
  try {
    const res = await axios.delete(`${API2}/playlist/remove-from-playlist`, {
      data,
    });
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message:
          res.status == 200
            ? "Podcast Removed Successfully"
            : "Something went wrong",
      };
    }
  } catch (error) {
    console.log(error, " error hai");
    return {
      data: null,
      status: 500,
      error: true,
      message:
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Something went wrong",
    };
  }
};

// Get All Playlits - http://localhost:3001/api/playlist/get-all-playlists

export const getAllPlaylists = async () => {
  try {
    const res = await axios.get(`https://fipr-backend.onrender.com/api/playlist/get-all-playlist`);
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message: "All Playlists Fetched Successfully",
      };
    }
  } catch (error) {
    console.log(error, " error hai");
    return {
      data: null,
      status: 500,
      error: true,
      message: error?.response?.data?.error || "Something went wrong",
    };
  }
}

