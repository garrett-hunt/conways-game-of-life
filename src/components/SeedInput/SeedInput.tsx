import { decodeString } from "../../utils/utils";
import "./SeedInput.css";
import { Grid } from "../../Pages/Homepage/Homepage";

interface SeedInputProps {
  seedInput: string;
  setSeedInput: React.Dispatch<React.SetStateAction<string>>;
  setGrid: React.Dispatch<React.SetStateAction<Grid>>;
}

const SeedInput = ({ seedInput, setSeedInput, setGrid }: SeedInputProps) => {
  const handleSeedInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSeedInput(e.target.value);
  };

  const updateSeed = () => {
    setGrid(decodeString(seedInput));
  };

  return (
    <div className="seedInputContainer">
      <textarea
        className="seedInput"
        value={seedInput}
        onChange={handleSeedInputChange}
        rows={10}
      ></textarea>
      <button
        className="seedInputButton"
        style={{ width: "10%" }}
        onClick={updateSeed}
      >
        Set Seed
      </button>
    </div>
  );
};

export default SeedInput;
