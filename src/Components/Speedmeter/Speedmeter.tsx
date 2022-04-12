import React from "react";
import "./Speedmeter.css";

let root = document.documentElement;

export const SpeedMeter = ({
  level,
  index,
}: {
  level: string;
  index: number | null;
}) => {
  root.style.setProperty("--deg", `${index}deg`);
  return (
    <div>
      <div className="gauge-wrapper">
        <div className="gauge four rischio">
          <div className="slice-colors">
            <div className="st slice-item" />
            <div className="st slice-item" />
            <div className="st slice-item"></div>
            <div className="st slice-item"></div>
          </div>
          <div className="needle"></div>
          <div className="gauge-center">
            <div className="label">{index}</div>
            <div className="number">{level}</div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
