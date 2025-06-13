import React from "react";
import "./StatusBar.css";

export default function StatusBar({
  playerName,
  gameDay,
  gameTime,
  money,
  hunger,
  energy,
  hygiene,
  happiness,
}) {
  const timeStr = `${String(Math.floor(gameTime / 60)).padStart(
    2,
    "0"
  )}:${String(gameTime % 60).padStart(2, "0")}`;

  function getGreeting(time) {
    if (time >= 6 * 60 && time < 12 * 60) {
      return "Good Morning";
    } else if (time >= 12 * 60 && time < 16 * 60) {
      return "Good Afternoon";
    } else if (time >= 16 * 60 && time < 19 * 60) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  }

  const renderBar = (label, value) => (
    <div className="status-row">
      <span className="status-icon">{label}</span>
      <div className="bar">
        <div
          className="bar-fill"
          style={{ width: `${Math.max(0, Math.min(value, 100))}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div id="status">
      <div id="topInfo">
        <p>
          {getGreeting(gameTime)}, <span id="playerName">{playerName}</span>
        </p>
        <p>
          Day {gameDay} | {timeStr}
        </p>
        <p>
          💰 <span id="money">Rp. {Math.max(0, money)}.000</span>
        </p>
      </div>
      <div id="statusBar">
        {renderBar("🍗", hunger)}
        {renderBar("💤", energy)}
        {renderBar("🛁", hygiene)}
        {renderBar("😊", happiness)}
      </div>
    </div>
  );
}
