import { useState, useContext } from "react";
import { SocketContext } from "./context/socket";

import Board from "./components/Board";
import Login from "./components/Login";
import "./App.css";

function App() {
  const socket = useContext(SocketContext);

  const [tileList, setTileList] = useState(new Array(9).fill(""));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isWinner, setIsWinner] = useState(undefined);

  const newPlayerJoinHandler = (username, room) => {
    socket.emit("join", { username, room });
    setIsLoggedIn(true);
  };

  socket.on("startGame", ({ list }) => {
    setTileList(list);
  });

  socket.on("updateGame", ({ list, winner }) => {
    setTileList(list);
    if (winner) {
      setIsWinner(winner);
    }
  });

  const onTileClickHandler = (event) => {
    if (isWinner) {
      return;
    }
    const selectedTile = event.target;
    if (selectedTile.innerText === "X" || selectedTile.innerText === "O") {
      return;
    }
    socket.emit("tileClick", { index: selectedTile.id });
  };

  return (
    <div className="App">
      {!isLoggedIn && <Login onJoin={newPlayerJoinHandler} />}
      {isLoggedIn && (
        <Board
          winner={isWinner}
          tiles={tileList}
          onClick={onTileClickHandler}
        />
      )}
    </div>
  );
}

export default App;