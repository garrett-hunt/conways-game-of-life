import { memo } from "react";
import "./RulesList.css";

const RulesList = memo(() => {
  return (
    <div className="rulesList">
      <div>Rules of Conway's Game of Life</div>
      <ul>
        <li>Any living cell with less than two neighbors will die</li>
        <li>Any living cell with two or three living neighbors will live</li>
        <li>Any living cell with more than three living neighbors will die</li>
        <li>
          Any dead cell with exactly three living neighbors will become alive
        </li>
      </ul>
    </div>
  );
});

export default RulesList;
