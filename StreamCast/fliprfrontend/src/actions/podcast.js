import axios from "axios";

const API2 = "https://fipr-backend.onrender.com/api";
const API1 = "http://localhost:3001/api";
// https://fipr-backend.onrender.com/api
// const API2 = "https://elitmusbackend-6bsu.onrender.com";

// export const addGame = async (data) => {
//   try {
//     const res = await axios.post(`${API2}/add-games`, data);
//     if (res) {
//       return {
//         data: res.data,
//         status: res.status,
//         error: false,
//         message: "Game Added Successfully",
//       };
//     }
//   } catch (error) {
//     console.log(error, " error hai");
//     return {
//       data: null,
//       status: 500,
//       error: true,
//       message: error?.response?.data?.error || "Something went wrong",
//     };
//   }
// };

export const createPodcastInDatabase = async (data) => {
  try {
    const res = await axios.post(`${API2}/podcast/create-podcast`, data);
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

// /delete-podcast/:id
export const deletePodcastInDatabase = async (id) => {
  try {
    const res = await axios.delete(`${API2}/podcast/delete-podcast/${id}`);
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

//  update-podcast/:id
export const updatePodcastInDatabase = async (data, id) => {
  try {
    const res = await axios.put(`${API2}/podcast/update-podcast/${id}`, data);
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message:
          res.status == 200
            ? "Podcast updated Successfully"
            : "Something went wrong",
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

// get-podcast-byuser/:id

export const getPodcastByUser = async (id) => {
  try {
    const res = await axios.get(`${API2}/podcast/get-podcast-byuser/${id}`);
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message:
          res.status == 200
            ? "Podcast updated Successfully"
            : "Something went wrong",
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

// Add to Favorite pocasts
export const addToFavoritePodcast = async (data) => {
  try {
    const res = await axios.put(
      `${API2}/podcast/add-to-favorite-podcast`,
      data
    );
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message:
          res.status == 200
            ? "Podcast updated Successfully"
            : "Something went wrong",
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

// Remove to Favorite pocasts
export const RemoveFavoritePodcast = async (data) => {
  try {
    const res = await axios.put(
      `${API2}/podcast//remove-favorite-podcast`,
      data
    );
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message:
          res.status == 200
            ? "Podcast updated Successfully"
            : "Something went wrong",
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

// Get USer Favorite Podcasts

export const getUserFavoritePodcasts = async (id) => {
  try {
    const res = await axios.get(`${API2}/podcast/get-fav-podcasts/${id}`);
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message:
          res.status == 200
            ? "Podcast updated Successfully"
            : "Something went wrong",
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

// Get Podcasts By Category
export const getPodcastsByCategory = async (name) => {
  try {
    const res = await axios.get(`${API2}/get-podcast-bycategory/name`);
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message:
          res.status == 200
            ? "Podcast updated Successfully"
            : "Something went wrong",
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

// Increment Podcast Views
export const incrementPodcastViews = async (data) => {
  try {
    const res = await axios.put(`${API2}/podcast/add-view`, data);
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message:
          res.status == 200
            ? "Podcast updated Successfully"
            : "Something went wrong",
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
