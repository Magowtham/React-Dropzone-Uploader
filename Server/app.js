const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

let recievdedChunk = 0;
const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//handling the request from client side
io.on("connection", (socket) => {
  socket.on("dataChunk", (data) => {
    if (Number(data.start) === 0) {
      recievdedChunk = 0;
    }
    recievdedChunk++;
    console.log(data.chunk);
    const percent = Math.round(
      (recievdedChunk / Number(data.totalChunks)) * 100
    );
    socket.emit("progress", percent);
  });
});

//listening to the port number
server.listen(5000, () => {
  console.log("server is runnig on port : 5000");
});
