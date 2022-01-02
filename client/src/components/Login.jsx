import "../App.css";
import { useState } from "react";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const roomChangeHandler = (e) => {
    setRoom(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.onJoin(username, room);
  };

  return (
    <div className="login-page">
      <form onSubmit={onSubmitHandler} className="login-form">
        <h1>Welcome to Online tic-Tac-Toe</h1>
        <input
          type="text"
          value={username}
          placeholder="Your name..."
          onChange={usernameChangeHandler}
          className="login-user"
        ></input>
        <input
          type="text"
          value={room}
          onChange={roomChangeHandler}
          placeholder="Room number..."
          className="login-room"
        ></input>
        <button type="submit" className="login-button">
          {" "}
          Join A Quick Game!
        </button>
        <p>
          <b>
            *In order to play with a friend, both player must enter the same
            room number
          </b>
        </p>
      </form>
    </div>
  );
};

export default Login;
