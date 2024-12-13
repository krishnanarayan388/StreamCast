import { createSlice } from "@reduxjs/toolkit";

const UserSlice =  createSlice({
    name: "User",
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            return action.payload
        },
            
    }
});


export const {setUser} = UserSlice.actions;

export default UserSlice.reducer;

