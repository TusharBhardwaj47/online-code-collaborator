import { io } from "socket.io-client";

const socket = io("https://online-code-collaborator-2.onrender.com", {
  autoConnect: false,
  transports: ["websocket"],
})

  auth: {
    token: localStorage.getItem("token"),
    name; "Tushar"
  }
});

export default socket;