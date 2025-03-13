import { ChangeEvent, useState } from "react";
import "./SpeedSlider.css";

type SpeedSliderProps = {
  label: string;
  step: number;
  min: number;
  max: number;
  defaultValue: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
};

const SpeedSlider = ({
  label,
  step,
  min,
  max,
  defaultValue,
  setSpeed,
}: SpeedSliderProps) => {
  const [sliderValue, setSliderValue] = useState(defaultValue);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = parseFloat(event.target.value);
    setSliderValue(value);
    setSpeed(value);
  };

  return (
    <div className="sliderContainer">
      <div>{label}</div>

      <input
        type="range"
        value={sliderValue}
        min={min}
        max={max}
        step={step}
        onChange={handleOnChange}
      />
      <div>{sliderValue + "ms"}</div>
    </div>
  );
};

export default SpeedSlider;
