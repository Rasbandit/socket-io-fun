import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3005");
let messages = [];

function subscribeToTimer(cb) {
  socket.on("timer", timestamp => cb(null, timestamp));
  socket.emit("subscribeToTimer", 1000);
  socket.on("messages", messagesArr => {
    messages = messagesArr;
    console.log(`received : ${messagesArr}`);
  });
}

function emitMessage(string) {
  socket.emit("new message", string);
}

function getMessages() {
  return messages;
}
export { subscribeToTimer, emitMessage, getMessages };
