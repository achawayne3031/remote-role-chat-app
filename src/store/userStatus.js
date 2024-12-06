import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    connected: false,
    loggedIn: false,
  },
  reducers: {
    addUserData: (state, actions) => {
      state.data = actions.payload;
    },
    setConnected: (state, actions) => {
      state.connected = true;
    },
    setLoggedIn: (state, actions) => {
      state.loggedIn = true;
    },
    logOutUser: (state, actions) => {
      state.connected = false;
      state.loggedIn = false;
      state.data = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUserData, setConnected, setLoggedIn, logOutUser } =
  UserSlice.actions;

export default UserSlice.reducer;
