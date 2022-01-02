import "../App.css";

const Tile = (props) => {
  return (
    <div className="tile" id={props.id} onClick={props.onClick}>
      {props.value}
    </div>
  );
};

export default Tile;
