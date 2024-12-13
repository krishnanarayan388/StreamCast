import { createSlice } from "@reduxjs/toolkit";

const PodcastSlice = createSlice({
  name: "Podcast",
  initialState: null,
  reducers: {
    setPodcast: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPodcast } = PodcastSlice.actions;

export default PodcastSlice.reducer;
