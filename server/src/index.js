const path = require("path");
const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const { addUser, users, getUser, getUsersInRoom } = require("./utils/users");
const calculateWinner = require("./utils/game");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../../client")));

const tileList = new Array(9).fill("");

const generateSign = () => {
  if (users.length === 0) {
    currentSign = "X";
  } else {
    currentSign = "O";
  }
  return currentSign;
};

const updateList = (index, value) => {
  tileList[index] = value;
};


io.on("connection", (socket) => {
  tileList.fill("");

  socket.on("join", ({ username, room }) => {
    const user = addUser({
      id: socket.id,
      username,
      room,
      sign: generateSign(),
    });
    socket.join(user.room);
    io.to(user.room).emit("startGame", { list: tileList });
  });

  socket.on("tileClick", ({ index }) => {
    const user = getUser(socket.id);
    console.log(user, "here");
    updateList(index, user.sign);
    const winner = calculateWinner(tileList);
    console.log(winner);
    io.emit("updateGame", { list: tileList, winner: winner });
  });
});

server.listen(port, () => {
  console.log("server is listening on port " + port);
});
