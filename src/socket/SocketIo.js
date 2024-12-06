import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";

export const socket = io(URL, { autoConnect: false });

export const connectedUsers = [];

export const connectUser = (data) => {
  socket.connect();
  socket.emit("connected", data);
};

export const sendMessage = (data) => {
  socket.emit("send-message", data);
};

export const getMessage = () => {
  socket.emit("get-message");
};

export const disConnectUser = (data) => {
  socket.disconnect();
  //socket.emit("connected", data);
  // socket.emit("connect", data, () => {});
};

export const getRegisteredUsers = () => {
  return connectedUsers;
};
