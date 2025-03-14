import "./Tile.css";

interface TileProps {
  value: number;
  row: number;
  col: number;
  setGrid: React.Dispatch<React.SetStateAction<number[][]>>;
}

const Tile = ({ value, row, col, setGrid }: TileProps) => {
  const handleClick = () => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((rowArr, rowIndex) =>
        rowIndex === row
          ? rowArr.map((cell, colIndex) =>
              colIndex === col ? (cell ? 0 : 1) : cell
            )
          : rowArr
      );
      return newGrid;
    });
  };

  return (
    <div
      className={`tile ${value === 0 ? "dead" : "alive"}`}
      onClick={handleClick}
    ></div>
  );
};

export default Tile;
