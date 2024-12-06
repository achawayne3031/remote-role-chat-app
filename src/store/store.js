import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import UserReducer from "./userStatus";

export default configureStore({
  reducer: {
    chat: chatReducer,
    user: UserReducer,
  },
  devTools: true,
});
