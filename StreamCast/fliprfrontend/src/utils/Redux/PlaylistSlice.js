import { createSlice } from "@reduxjs/toolkit";

const PlaylistSlice = createSlice({
    name: "Playlist",
    initialState: [],
    reducers: {
        setPlaylist: (state, action) => {
            return action.payload
        },

    }
});


export const { setPlaylist } = PlaylistSlice.actions;

export default PlaylistSlice.reducer;

