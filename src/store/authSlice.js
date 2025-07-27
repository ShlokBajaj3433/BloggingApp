import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  user: null,
  token: null,
  error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.userData = action.payload.userData;
            state.error = null;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.user = null;
            state.token = null;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },    
    },
})

export const { login, logout, setError } = authSlice.actions;
export default authSlice.reducer;