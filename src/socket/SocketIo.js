import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";

export const socket = io(URL, {
  autoConnect: false,
});

var startPinger;

export const connectedUsers = [];

export const connectUser = (data) => {
  socket.io.opts.query = {
    socketKey: data.email,
  };

  socket.connect();
  socket.emit("connected", data);
  startPingingServer();
};

function startPingingServer() {
  startPinger = setInterval(() => {
    socket.emit("ping");
  }, 5000);
}

export const sendMessage = (data) => {
  socket.emit("send-message", data);
};

export const getMessage = (data) => {
  socket.emit("get-message", data);
};

export const disConnectUser = (data) => {
  socket.disconnect();
  clearInterval(startPinger);
};

export const getRegisteredUsers = () => {
  return connectedUsers;
};
