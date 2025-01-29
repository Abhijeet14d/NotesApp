import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

const AuthSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { addUser, logout } = AuthSlice.actions;
export default AuthSlice.reducer;