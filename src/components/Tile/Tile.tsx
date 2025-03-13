import { Grid } from "../../Pages/Homepage/Homepage";
import "./Tile.css";

interface TileProps {
  value: number;
  row: number;
  col: number;
  grid: Grid;
  setGrid: React.Dispatch<React.SetStateAction<number[][]>>;
}

const Tile = ({ value, row, col, grid, setGrid }: TileProps) => {
  const handleClick = () => {
    const newGrid = [...grid];
    newGrid[row] = [...newGrid[row]];
    newGrid[row][col] = value ? 0 : 1;

    setGrid(newGrid);
  };

  return (
    <div
      className={`tile ${value === 0 ? "dead" : "alive"}`}
      onClick={handleClick}
    ></div>
  );
};

export default Tile;
