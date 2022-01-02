import '../App.css';
import Tile from "./Tile";

const Board = (props) => {
  return (
    <div className="game-board">
      {props.tiles.map((tile, index) => (
        <Tile id={index} value={tile} key={index} onClick={props.onClick}/>
      ))}
      <h2>Winner: {props.winner}</h2>
    </div>
  );
};

export default Board;
