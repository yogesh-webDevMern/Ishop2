"use client";
import { useState } from "react";

const RangeSelector = () => {
  const [minValue, setMinValue] = useState(100);
  const [maxValue, setMaxValue] = useState(900);

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-xl">
      <h2 className="text-lg font-semibold text-gray-700">Select Price Range</h2>
      <div className="relative mt-6 h-4">
        {/* Track */}
        <div className="absolute w-full h-1 bg-gray-300 rounded"></div>
        
        {/* Highlighted Range */}
        <div
          className="absolute h-1 bg-teal-700 rounded transition-all"
          style={{ left: `${(minValue / 1000) * 100}%`, right: `${100 - (maxValue / 1000) * 100}%` }}
        ></div>

        {/* Range Inputs */}
        <input
          type="range"
          min="0"
          max="1000"
          value={minValue}
          onChange={(e) => setMinValue(Math.min(Number(e.target.value), maxValue - 10))}
          className="absolute w-full opacity-0 cursor-pointer"
          style={{ zIndex: 2 }}
        />
        <input
          type="range"
          min="0"
          max="1000"
          value={maxValue}
          onChange={(e) => setMaxValue(Math.max(Number(e.target.value), minValue + 10))}
          className="absolute w-full opacity-0 cursor-pointer"
          style={{ zIndex: 2 }}
        />

        {/* Custom Handles */}
        <div
          className="absolute w-6 h-6 bg-teal-700 border-4 border-white rounded-full shadow-lg shadow-teal-400 transition-all"
          style={{ left: `calc(${(minValue / 1000) * 100}% - 12px)`, top: "-10px" }}
        ></div>
        <div
          className="absolute w-6 h-6 bg-teal-700 border-4 border-white rounded-full shadow-lg shadow-teal-400 transition-all"
          style={{ left: `calc(${(maxValue / 1000) * 100}% - 12px)`, top: "-10px" }}
        ></div>
      </div>

      <div className="flex justify-between mt-4 text-sm font-medium text-gray-600">
        <span>₹{minValue}</span>
        <span>₹{maxValue}</span>
      </div>
    </div>
  );
};

export default RangeSelector;
