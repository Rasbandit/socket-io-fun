const bodyParser = require("body-parser");
const port = 3005;
const app = require("express")();
// const cors = require("cors");
// app.use(cors());

const server = require("http").Server(app);
const io = require("socket.io")(server);

let clientIDarr = [];
let messagesArr = [];

// server.listen(port, () => console.log(`listening on ${port}`));

io.on("connection", function(client) {
  console.log(`client with id: << ${client.id} >> has connected`);
  clientIDarr.push(client.id);
  console.log(`${clientIDarr.length} client(s) connected`);
  client.join("room1", () => console.log("sb joined a room"));
  client.on("subscribeToTimer", interval => {
    console.log("client is subscribing to timer with interval ", interval);
    setInterval(() => {
      client.emit("timer", new Date());
    }, interval);
  });
  client.on("new message", message => {
    console.log("received message: ", message);
    messagesArr.push(message);
    client.to("room1").emit("messages", [1, 2, 3]);
  });

  //check if connected
  // setTimeout(()=> socket.disconnect(true), 5000)
});

io.listen(port);
console.log(`listending on port ${port}`);
