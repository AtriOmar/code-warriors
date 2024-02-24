import { io } from "socket.io-client";

// fetch("/api/socket");

// "undefined" means the URL will be computed from the `window.location` object
const URL = undefined;

console.log("-------------------- socket working --------------------");

let socket = null;

if (!socket) {
  socket = io(URL, {
    forceNew: true,
    autoConnect: false,
    transports: ["websocket"],
  });

  socket.on("connect", () => console.log("connecting"));
}

export { socket };
