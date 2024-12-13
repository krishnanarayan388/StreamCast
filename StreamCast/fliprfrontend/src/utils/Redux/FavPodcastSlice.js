import { createSlice } from "@reduxjs/toolkit";

const FavPodcastSlice = createSlice({
    name: "PodcastList",
    initialState: [],
    reducers: {
        setFavPodcasts: (state, action) => {
            return action.payload
        },

    }
});


export const { setFavPodcasts } = FavPodcastSlice.actions;

export default FavPodcastSlice.reducer;

