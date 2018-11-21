const WebSocket = require("ws");

const ws = new WebSocket.Server({ port: 8080 });

ws.on("connection", con => {
  con.on("message", message => {
    console.log("received: %s", message);
    con.send(message);
  });

  con.send("something");
});
