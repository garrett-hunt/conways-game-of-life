import { useState } from "react";
import RulesList from "../../components/RulesList/RulesList";
import SeedInput from "../../components/SeedInput/SeedInput";
import Stats from "../../components/Stats/Stats";
import "./Homepage.css";
import { initialGrid } from "../../Grids/Grids";
import { encodeArray } from "../../utils/utils";
import SpeedSlider from "../../components/SpeedSlider/SpeedSlider";
import GridComponent from "../../components/GridComponent/GridComponent";

export type GameState = "start" | "playing" | "reverse" | "paused";
export type Grid = number[][];
export type Stats = {
  generations: number;
  startingCells: number;
  currentCells: number;
};

const defaultStats: Stats = {
  generations: 0,
  startingCells: 0,
  currentCells: 0,
};

const defaultSpeed = 500;

const Homepage = () => {
  const [gameState, setGameState] = useState<GameState>("start");
  const [grid, setGrid] = useState<Grid>(initialGrid);
  const [seedInput, setSeedInput] = useState<string>(encodeArray(initialGrid));
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [speed, setSpeed] = useState<number>(defaultSpeed);

  return (
    <div className="container">
      <GridComponent
        setGrid={setGrid}
        grid={grid}
        gameState={gameState}
        setSeedInput={setSeedInput}
        setGameState={setGameState}
        setStats={setStats}
        defaultStats={defaultStats}
        speed={speed}
      />
      <div className="infoContainer">
        <div className="statAndRulesContainer">
          <Stats stats={stats} />
          <RulesList />
        </div>
        <SeedInput
          seedInput={seedInput}
          setSeedInput={setSeedInput}
          setGrid={setGrid}
        />
        <SpeedSlider
          label="Tick Speed"
          step={10}
          min={10}
          max={1000}
          defaultValue={defaultSpeed}
          setSpeed={setSpeed}
        />
      </div>
    </div>
  );
};

export default Homepage;
