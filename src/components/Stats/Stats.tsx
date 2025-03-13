import { Stats } from "../../Pages/Homepage/Homepage";
import "./Stats.css";

export type StatProps = {
  stats: Stats;
};

const StatsComponent = ({ stats }: StatProps) => {
  return (
    <div className="statsContainer">
      <div>Generations: {stats.generations}</div>
      <div>Starting: {stats.startingCells}</div>
      <div>Current: {stats.currentCells}</div>
    </div>
  );
};

export default StatsComponent;
