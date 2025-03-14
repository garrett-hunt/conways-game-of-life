import { useEffect } from "react";
import { encodeArray } from "../../utils/utils";
import { Grid, GameState, Stats } from "../../Pages/Homepage/Homepage";
import { initialGrid } from "../../Grids/Grids";

import "./GridComponent.css";
import Tile from "../Tile/Tile";

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const isDefinedCell = (grid: Grid, row: number, col: number) =>
  row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;

const liveNeighborsCount = (grid: Grid, row: number, col: number) => {
  return directions.reduce(
    (count, [directionRow, directionColumn]) =>
      count +
      (isDefinedCell(grid, row + directionRow, col + directionColumn)
        ? grid[row + directionRow][col + directionColumn]
        : 0),
    0
  );
};

const calculateFate = (
  cellValue: number,
  grid: Grid,
  row: number,
  col: number
) => {
  const liveNeighbors = liveNeighborsCount(grid, row, col);
  if (cellValue && (liveNeighbors < 2 || liveNeighbors > 3)) {
    return 0;
  }
  if (!cellValue && liveNeighbors === 3) {
    return 1;
  }
  return cellValue;
};

const getLiveCellCount = (map: Grid) => {
  let count = 0;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 1) {
        count++;
      }
    }
  }

  return count;
};

type GridProps = {
  setGrid: React.Dispatch<React.SetStateAction<Grid>>;
  grid: Grid;
  gameState: GameState;
  setSeedInput: React.Dispatch<React.SetStateAction<string>>;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  setStats: React.Dispatch<React.SetStateAction<Stats>>;
  defaultStats: Stats;
  speed: number;
};

const GridComponent = ({
  setGrid,
  grid,
  gameState,
  setSeedInput,
  setGameState,
  setStats,
  defaultStats,
  speed,
}: GridProps) => {
  useEffect(() => {
    setStats((stats) => ({
      ...stats,
      startingCells:
        gameState === "start" ? getLiveCellCount(grid) : stats.startingCells,
      currentCells: getLiveCellCount(grid),
    }));
    setSeedInput(encodeArray(grid));
  }, [grid, gameState]);

  useEffect(() => {
    if (gameState === "playing") {
      const interval = setInterval(runGame, speed);
      return () => clearInterval(interval);
    }
  }, [gameState, speed]);

  const runGame = (): void => {
    setGrid((currentGrid) => {
      const newGrid: Grid = currentGrid.map((row, i) =>
        row.map((cell, j) => calculateFate(cell, currentGrid, i, j))
      );

      setSeedInput(encodeArray(newGrid));

      setStats((stats) => ({
        ...stats,
        generations: (stats.generations += 1),
      }));

      return newGrid;
    });
  };

  const handleReset = () => {
    setGameState("start");
    setGrid(initialGrid);
    setSeedInput(encodeArray(initialGrid));
    setStats(defaultStats);
  };

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cellValue, itemIndex) => (
            <Tile
              key={`${rowIndex}-${itemIndex}`}
              value={cellValue}
              row={rowIndex}
              col={itemIndex}
              setGrid={setGrid}
              grid={grid}
            />
          ))}
        </div>
      ))}
      <div className="buttonContainer">
        <button className="playButton" onClick={handleReset}>
          Reset
        </button>
        <button
          className="playButton"
          onClick={() =>
            setGameState((gameState) =>
              gameState === "playing" ? "paused" : "playing"
            )
          }
        >
          {gameState === "playing" ? "Pause" : "Play"}
        </button>

        <button className="playButton" onClick={() => runGame()}>
          {"|>"}
        </button>
      </div>
    </div>
  );
};

export default GridComponent;
