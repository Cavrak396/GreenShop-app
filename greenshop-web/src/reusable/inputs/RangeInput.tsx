import { useEffect, useRef } from "react";
import { RangeType } from "../types/inputsTypes";

function RangeInput({ className, min, max, value, onChange }: RangeType) {
  const rangeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (rangeRef.current) {
      const percentage = ((value - min) / (max - min)) * 100;
      rangeRef.current.style.background = `linear-gradient(
        to right,
        rgba(70, 163, 88, 1) ${percentage}%,
        rgba(221, 221, 221, 1) ${percentage}%
      )`;
    }
  }, [value, min, max]);

  return (
    <input
      type="range"
      className={className}
      min={min}
      max={max}
      value={value}
      aria-valuenow={value}
      onChange={(e) => onChange(Number(e.target.value))}
      ref={rangeRef}
    />
  );
}

export default RangeInput;
