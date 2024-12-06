import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    connectedUsers: [],
    selectedChatUser: {},
  },
  reducers: {
    addConnectedUser: (state, actions) => {
      state.connectedUsers = [...state.connectedUsers, actions.payload];
    },
    removeConnectedUser: (state, actions) => {
      state.connectedUsers = state.connectedUsers.filter(
        (value) => value.email !== actions.payload.email
      );
    },
    setUserForChat: (state, actions) => {
      state.selectedChatUser = actions.payload;
    },
    setConnectedUsers: (state, actions) => {
      state.connectedUsers = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addConnectedUser,
  removeConnectedUser,
  setUserForChat,
  setConnectedUsers,
} = chatSlice.actions;

export default chatSlice.reducer;
