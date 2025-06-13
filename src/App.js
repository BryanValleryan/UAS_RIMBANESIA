import React, { useState, useEffect, useRef } from "react";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import GameOverPopup from "./components/GameOverPopup";
import { getCurrentLocation } from "./components/GameScreen";
import "./App.css";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [character, setCharacter] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const [gameDay, setGameDay] = useState(1);
  const [gameTime, setGameTime] = useState(8 * 60);
  const [money, setMoney] = useState(100);
  const [hunger, setHunger] = useState(70);
  const [energy, setEnergy] = useState(70);
  const [hygiene, setHygiene] = useState(70);
  const [happiness, setHappiness] = useState(70);

  const isGameOver =
    hunger <= 0 || energy <= 0 || hygiene <= 0 || happiness <= 0;

  const [currentLocation, setCurrentLocation] = useState(null);
  const [pos, setPos] = useState({ x: 70, y: 60 });
  const [facing, setFacing] = useState("right");

  const [visitedLocations, setVisitedLocations] = useState({
    home: false,
    beach: false,
    temple: false,
    mountain: false,
    lake: false,
  });

  const [activityCounter, setActivityCounter] = useState({});

  const safeSetMoney = (value) => {
    setMoney((prevMoney) => {
      let newMoney = typeof value === "function" ? value(prevMoney) : value;
      if (newMoney < 0) newMoney = 0;
      return newMoney;
    });
  };

  const [locationVisits, setLocationVisits] = useState({
    home: 0,
    beach: 0,
    temple: 0,
    mountain: 0,
    lake: 0,
  });
  const [activityLog, setActivityLog] = useState({});
  const [inventoryItems, setInventoryItems] = useState({});

  const lastLocationRef = useRef(null);

  useEffect(() => {
    const loc = getCurrentLocation(pos);
    if (loc && loc !== lastLocationRef.current) {
      setLocationVisits((prev) => ({
        ...prev,
        [loc]: (prev[loc] || 0) + 1,
      }));
      lastLocationRef.current = loc;
    }
  }, [pos]);

  const logActivity = (activityName) => {
    setActivityLog((prev) => ({
      ...prev,
      [activityName]: (prev[activityName] || 0) + 1,
    }));
  };

  useEffect(() => {
    if (!gameStarted || isGameOver) return;

    const interval = setInterval(() => {
      setGameTime((prevTime) => {
        const newTime = prevTime + 1;
        if (newTime >= 1440) {
          return 0;
        }
        return newTime;
      });

      setHunger((h) => Math.max(0, h - 0.2));
      setEnergy((e) => Math.max(0, e - 0.2));
      setHygiene((h) => Math.max(0, h - 0.2));
      setHappiness((h) => Math.max(0, h - 0.2));
    }, 200);

    return () => clearInterval(interval);
  }, [gameStarted, isGameOver]);

  useEffect(() => {
    if (gameTime === 0 && gameStarted) {
      setGameDay((prevDay) => prevDay + 1);
    }
  }, [gameTime, gameStarted]);

  const handleStart = (name, charId) => {
    setPlayerName(name);
    setCharacter(charId);
    setGameStarted(true);
  };

  const restartGame = () => {
    setGameStarted(false);
    setPlayerName("");
    setCharacter(0);
    setGameDay(1);
    setGameTime(8 * 60);
    setMoney(100);
    setHunger(70);
    setEnergy(70);
    setHygiene(70);
    setHappiness(70);
    setCurrentLocation(null);
    setPos({ x: 70, y: 60 });
    setFacing("right");
    setVisitedLocations({
      home: false,
      beach: false,
      temple: false,
      mountain: false,
      lake: false,
    });
    setActivityCounter({});
    setActivityLog({});
    setInventoryItems({});
    setLocationVisits({
      home: 0,
      beach: 0,
      temple: 0,
      mountain: 0,
      lake: 0,
    });
  };

  const getDeathCause = () => {
    if (happiness <= 0) return "depresi";
    if (energy <= 0) return "kelelahan ekstrem";
    if (hygiene <= 0) return "infeksi akibat kotor";
    if (hunger <= 0) return "kelaparan";
    return "penyebab tak diketahui";
  };

  return (
    <div>
      <header>
        <div id="logo">
          <img src="/assets/logo2.png" alt="Logo" />
        </div>
        <h1>RIMBANESIA</h1>
      </header>

      {!gameStarted ? (
        <StartScreen
          onStart={handleStart}
          character={character}
          setCharacter={setCharacter}
        />
      ) : (
        <>
          <GameScreen
            playerName={playerName}
            character={character}
            gameDay={gameDay}
            gameTime={gameTime}
            money={money}
            hunger={hunger}
            energy={energy}
            hygiene={hygiene}
            happiness={happiness}
            setGameDay={setGameDay}
            setGameTime={setGameTime}
            setMoney={safeSetMoney}
            setHunger={setHunger}
            setEnergy={setEnergy}
            setHygiene={setHygiene}
            setHappiness={setHappiness}
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
            pos={pos}
            setPos={setPos}
            facing={facing}
            setFacing={setFacing}
            visitedLocations={visitedLocations}
            setVisitedLocations={setVisitedLocations}
            activityCounter={activityCounter}
            setActivityCounter={setActivityCounter}
            inventoryItems={inventoryItems}
            setInventoryItems={setInventoryItems}
            logActivity={logActivity}
            day={gameDay}
          />
          {isGameOver && (
            <GameOverPopup
              name={playerName}
              cause={getDeathCause()}
              day={gameDay}
              money={money}
              status={{ hunger, energy, hygiene, happiness }}
              inventory={inventoryItems}
              visits={locationVisits}
              activityLog={activityLog}
              onRestart={restartGame}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
