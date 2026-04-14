import { io } from "socket.io-client";

const socket = io("https://online-code-collaborator.onrender.com", {
  autoConnect: false,
  reconnection: true,
  transports: ["websocket"],

  auth: {
    token: localStorage.getItem("token"),
    name: "Tushar"
  }
});

export default socket;