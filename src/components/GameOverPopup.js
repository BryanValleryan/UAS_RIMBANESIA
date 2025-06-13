import React from "react";
import "./GameOverPopup.css";

const GameOverPopup = ({
  name,
  cause,
  day,
  money,
  status,
  inventory,
  visits,
  activityLog,
  onRestart,
}) => {
  const getLifeSatisfactionScore = () => {
    const { hunger = 0, happiness = 0, energy = 0, hygiene = 0 } = status || {};
    return hunger + happiness + energy + hygiene;
  };

  const lifeSatisfactionScore = getLifeSatisfactionScore();
  return (
    <div className="game-over-popup">
      <div className="game-over-content">
        <div className="game-over-title">GAME OVER</div>
        <div className="game-over-cause">
          {name} meninggal karena {cause}
        </div>
        <div className="game-over-stats">
          Bertahan hingga hari ke-{day}
          <br />
          Uang terkumpul: Rp {money.toLocaleString("id-ID")}.000
        </div>
        <div className="game-over-scrollable">
          <h3>Status Terakhir</h3>
          <ul>
            <li>🍗 Hunger: {status.hunger.toFixed(0)}%</li>
            <li>💤 Energy: {status.energy.toFixed(0)}%</li>
            <li>🛁 Hygiene: {status.hygiene.toFixed(0)}%</li>
            <li>😊 Happiness: {status.happiness.toFixed(0)}%</li>
          </ul>
          <br></br>

          <h3>Kunjungan Lokasi</h3>
          <ul>
            {Object.entries(visits).map(([loc, count]) => (
              <li key={loc}>
                {loc.charAt(0).toUpperCase() + loc.slice(1)}: {count}x
              </li>
            ))}
          </ul>
          <br></br>

          <h3>Aktivitas yang Dilakukan</h3>
          <ul>
            {Object.entries(activityLog).map(([act, count]) => (
              <li key={act}>
                {act}: {count}x
              </li>
            ))}
          </ul>
          <br></br>

          <h3>Item Inventory</h3>
          <ul>
            {Object.keys(inventory).length === 0 ? (
              <li>Tidak ada item</li>
            ) : (
              Object.entries(inventory).map(([item, count]) => (
                <li key={item}>
                  {item} (x{count})
                </li>
              ))
            )}
          </ul>
          <br></br>

          <div>
            <div id="life-satisfaction-score">
              <h3>Life Satisfaction Score : </h3>
              <h3>{lifeSatisfactionScore.toFixed(0)}</h3>
            </div>
          </div>
        </div>
        <button className="game-over-button" onClick={onRestart}>
          Main Lagi
        </button>
      </div>
    </div>
  );
};

export default GameOverPopup;
