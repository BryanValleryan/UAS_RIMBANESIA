import React, { useEffect, useState, useRef } from "react";
import StatusBar from "./StatusBar";
import { activities } from "./ActivityData";
import InventoryModal from "./InventoryModal";

const locationBounds = {
  home: { x: 140, y: 70, width: 80, height: 80 },
  beach: { x: 900, y: 80, width: 80, height: 80 },
  lake: { x: 135, y: 400, width: 80, height: 80 },
  mountain: { x: 950, y: 250, width: 80, height: 80 },
  temple: { x: 550, y: 300, width: 80, height: 80 },
};

function isColliding(rect1, rect2) {
  return !(
    rect1.x + rect1.width < rect2.x ||
    rect1.x > rect2.x + rect2.width ||
    rect1.y + rect1.height < rect2.y ||
    rect1.y > rect2.y + rect2.height
  );
}

export function getCurrentLocation(pos, characterSize = 50) {
  const charRect = {
    x: pos.x,
    y: pos.y,
    width: characterSize,
    height: characterSize,
  };

  for (const [location, bounds] of Object.entries(locationBounds)) {
    if (isColliding(charRect, bounds)) {
      return location;
    }
  }
  return null;
}

function getBackgroundImage(gameTime) {
  if (typeof gameTime !== "number" || isNaN(gameTime)) {
    return "/assets/malam.png";
  }

  if (gameTime >= 6 * 60 && gameTime < 12 * 60) {
    return "/assets/pagi.png";
  } else if (gameTime >= 12 * 60 && gameTime < 17 * 60) {
    return "/assets/siang.png";
  } else if (gameTime >= 17 * 60 && gameTime < 19 * 60) {
    return "/assets/sore.png";
  } else {
    return "/assets/malam.png";
  }
}

export default function GameScreen(props) {
  const { character, pos, setPos, gameTime } = props;
  const moveStep = 10;
  const [facingLeft, setFacingLeft] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const [activityCounter, setActivityCounter] = useState({});
  const [hoveredDescription, setHoveredDescription] = useState(null);
  const activityMax = 99999999999999;

  const sidebarRef = useRef(null);
  const gameAreaRef = useRef(null);

  const CHARACTER_SIZE = 50;
  const GAME_AREA_WIDTH = 1400;
  const GAME_AREA_HEIGHT = 800;

  const [activeActivity, setActiveActivity] = useState(null);
  const [activityTimeLeft, setActivityTimeLeft] = useState(0);
  const [isActivityRunning, setIsActivityRunning] = useState(false);
  const activityTimerRef = useRef(null);

  const [inventoryOpen, setInventoryOpen] = useState(false);

  function clampPosition(x, y) {
    const maxX = GAME_AREA_WIDTH - CHARACTER_SIZE;
    const maxY = GAME_AREA_HEIGHT - CHARACTER_SIZE;
    return {
      x: Math.max(0, Math.min(x, maxX)),
      y: Math.max(0, Math.min(y, maxY)),
    };
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      let newX = pos.x;
      let newY = pos.y;
      let flipped = facingLeft;

      switch (e.key) {
        case "ArrowUp":
          newY = pos.y - moveStep;
          break;
        case "ArrowDown":
          newY = pos.y + moveStep;
          break;
        case "ArrowLeft":
          newX = pos.x - moveStep;
          flipped = true;
          break;
        case "ArrowRight":
          newX = pos.x + moveStep;
          flipped = false;
          break;
        default:
          return;
      }

      const clamped = clampPosition(newX, newY);
      setPos({ x: clamped.x, y: clamped.y });
      setFacingLeft(flipped);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pos, setPos, facingLeft]);

  useEffect(() => {
    const loc = getCurrentLocation(pos);
    setCurrentLocation(loc);
  }, [pos]);

  useEffect(() => {
    const sidebarElement = sidebarRef.current;
    if (!sidebarElement) return;

    if (currentLocation) {
      switch (currentLocation) {
        case "home":
          sidebarElement.style.backgroundImage =
            "url('/assets/sidebar-home.png')";
          break;
        case "beach":
          sidebarElement.style.backgroundImage =
            "url('/assets/sidebar-beach.png')";
          break;
        case "temple":
          sidebarElement.style.backgroundImage =
            "url('/assets/sidebar-temple.png')";
          break;
        case "mountain":
          sidebarElement.style.backgroundImage =
            "url('/assets/sidebar-mountain.png')";
          break;
        case "lake":
          sidebarElement.style.backgroundImage =
            "url('/assets/sidebar-lake.png')";
          break;
        default:
          sidebarElement.style.backgroundImage = "/assets/sidebar.png";
          break;
      }
    } else {
      sidebarElement.style.backgroundImage = "";
    }
  }, [currentLocation]);

  const moveCharacter = (direction) => {
    let newX = pos.x;
    let newY = pos.y;
    let flipped = facingLeft;

    switch (direction) {
      case "up":
        newY = pos.y - moveStep;
        break;
      case "down":
        newY = pos.y + moveStep;
        break;
      case "left":
        newX = pos.x - moveStep;
        flipped = true;
        break;
      case "right":
        newX = pos.x + moveStep;
        flipped = false;
        break;
      default:
        return;
    }

    const clamped = clampPosition(newX, newY);
    setPos({ x: clamped.x, y: clamped.y });
    setFacingLeft(flipped);
  };

  function handleActivityEffect(location, index, act) {
    const activityId = `${location}-${index}`;
    const locCounters = activityCounter[location] || {};
    const count = locCounters[activityId] || 0;

    if (count >= activityMax) {
      alert("You have done this activity too many times today!");
      return;
    }
    props.logActivity(act.name);

    if (act.effect.money !== undefined) {
      props.setMoney((prev) => prev + act.effect.money);
    }
    if (act.effect.hunger !== undefined) {
      props.setHunger((prev) =>
        Math.min(100, Math.max(0, prev + act.effect.hunger))
      );
    }
    if (act.effect.energy !== undefined) {
      props.setEnergy((prev) =>
        Math.min(100, Math.max(0, prev + act.effect.energy))
      );
    }
    if (act.effect.hygiene !== undefined) {
      props.setHygiene((prev) =>
        Math.min(100, Math.max(0, prev + act.effect.hygiene))
      );
    }
    if (act.effect.happiness !== undefined) {
      props.setHappiness((prev) =>
        Math.min(100, Math.max(0, prev + act.effect.happiness))
      );
    }

    setActivityCounter((prev) => ({
      ...prev,
      [location]: {
        ...locCounters,
        [activityId]: count + 1,
      },
    }));

    if (
      act.requireItem &&
      (!props.inventoryItems[act.requireItem] ||
        props.inventoryItems[act.requireItem] < 1)
    ) {
      alert(
        `Kamu membutuhkan 1 ${act.requireItem} untuk melakukan aktivitas ini!`
      );
      return;
    }

    if (act.removeItem) {
      removeItemFromInventory(act.removeItem);
    }

    if (act.giveItem) {
      giveItemToInventory(act.giveItem);
    }
  }

  function giveItemToInventory(itemName) {
    props.setInventoryItems((prev) => {
      const count = prev[itemName] || 0;
      return { ...prev, [itemName]: count + 1 };
    });
  }

  function removeItemFromInventory(itemName) {
    props.setInventoryItems((prev) => {
      const count = prev[itemName] || 0;
      if (count <= 1) {
        const copy = { ...prev };
        delete copy[itemName];
        return copy;
      }
      return { ...prev, [itemName]: count - 1 };
    });
  }

  function startActivity(location, index, act) {
    setActiveActivity({ location, index, act });
    setActivityTimeLeft(act.duration);
    setIsActivityRunning(true);
  }

  useEffect(() => {
    if (!isActivityRunning || !activeActivity) return;

    if (activityTimeLeft <= 0) {
      finishActivity();
      return;
    }

    activityTimerRef.current = setTimeout(() => {
      setActivityTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(activityTimerRef.current);
  }, [isActivityRunning, activityTimeLeft, activeActivity]);

  function finishActivity() {
    if (!activeActivity) return;
    const { location, index, act } = activeActivity;
    handleActivityEffect(location, index, act);
    setActiveActivity(null);
    setActivityTimeLeft(0);
    setIsActivityRunning(false);
  }

  function skipActivity() {
    finishActivity();
  }

  function renderActivityProgress() {
    if (!activeActivity || !isActivityRunning) return null;

    const { act } = activeActivity;
    const total = act.duration;
    const left = activityTimeLeft;
    const percent = Math.max(0, ((total - left) / total) * 100);

    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "35%",
          transform: "translate(-50%, -50%)",
          background: "rgba(0,0,0,0.8)",
          borderRadius: 16,
          padding: 28,
          zIndex: 2000,
          minWidth: 340,
          textAlign: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ fontSize: 22, marginBottom: 8, color: "white" }}>
          {act.icon} {act.name}
        </div>
        {act.animation && (
          <div style={{ marginBottom: 16 }}>
            <img
              src={act.animation}
              alt="activity animation"
              style={{
                width: 200,
                height: 130,
                objectFit: "contain",
                borderRadius: 8,
                background: "#222",
              }}
            />
          </div>
        )}
        <div
          style={{
            width: "100%",
            height: 20,
            background: "#444",
            borderRadius: 8,
            overflow: "hidden",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${percent}%`,
              background: "#4caf50",
              transition: "width 0.5s",
            }}
          />
        </div>
        <div style={{ marginBottom: 14, fontSize: 15, color: "white" }}>
          Sisa waktu: {left} detik
        </div>
        <button
          onClick={skipActivity}
          style={{
            padding: "7px 22px",
            fontSize: 16,
            borderRadius: 8,
            border: "none",
            background: "#e53935",
            color: "white",
            cursor: "pointer",
          }}
        >
          Skip
        </button>
      </div>
    );
  }

  function getDescription(act) {
    return (
      <div>
        <div>{act.description}</div>
        <br />
        <b>Efek:</b>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {Object.entries(act.effect).map(([stat, value]) => {
            let effect = "";
            switch (stat) {
              case "hunger":
                effect = value > 0 ? `+${value} kenyang` : `${value} kenyang`;
                break;
              case "energy":
                effect = value > 0 ? `+${value} energi` : `${value} energi`;
                break;
              case "hygiene":
                effect =
                  value > 0 ? `+${value} kebersihan` : `${value} kebersihan`;
                break;
              case "happiness":
                effect =
                  value > 0 ? `+${value} kebahagiaan` : `${value} kebahagiaan`;
                break;
              case "money":
                effect =
                  value > 0 ? `+Rp ${value}.000` : `-Rp ${Math.abs(value)}.000`;
                break;
              default:
                effect = `${stat}: ${value}`;
            }
            return <li key={stat}>{effect}</li>;
          })}
        </ul>
      </div>
    );
  }

  function useItem(itemName) {
    switch (itemName) {
      case "food":
        props.setHunger((h) => Math.min(100, h + 25));
        break;
      case "potion of energetic":
        props.setEnergy((e) => Math.min(100, e + 20));
        break;
      case "potion of cheerfulness":
        props.setHappiness((h) => Math.min(100, h + 20));
        break;
      case "potion of cleanliness":
        props.setHygiene((h) => Math.min(100, h + 20));
        break;
      default:
        return;
    }

    removeItemFromInventory(itemName);
  }

  return (
    <div id="gameScreen" style={{ display: "flex" }}>
      <audio
        src="./assets/iammusic/Pufino - Enjoy (freetouse.com).mp3"
        autoPlay
        loop
      />
      <div id="mainGame">
        <StatusBar
          playerName={props.playerName}
          gameDay={1}
          gameTime={gameTime}
          money={props.money}
          hunger={props.hunger}
          energy={props.energy}
          hygiene={props.hygiene}
          happiness={props.happiness}
        />
        <div
          id="gameArea"
          ref={gameAreaRef}
          style={{
            position: "relative",
            width: GAME_AREA_WIDTH,
            height: GAME_AREA_HEIGHT,
            maxWidth: "100%",
            background: "#222",
          }}
        >
          <div
            id="places"
            style={{
              backgroundImage: `url(${getBackgroundImage(gameTime)})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "100%",
              position: "absolute",
              inset: 0,
              zIndex: 1,
            }}
          >
            {Object.entries(locationBounds).map(([loc, bounds]) => (
              <img
                key={loc}
                id={loc}
                src="/assets/tanda seru.png"
                alt={loc.charAt(0).toUpperCase() + loc.slice(1)}
                style={{
                  position: "absolute",
                  left: bounds.x,
                  top: bounds.y,
                  width: bounds.width,
                  height: bounds.height,
                }}
              />
            ))}
          </div>
          <img
            id="gameCharacter"
            src={`/assets/${character}.gif`}
            alt="Game Character"
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y,
              width: CHARACTER_SIZE,
              height: CHARACTER_SIZE,
              transition: "left 0.1s, top 0.1s",
              zIndex: 999,
              transform: facingLeft ? "scaleX(-1)" : "scaleX(1)",
            }}
          />
          {renderActivityProgress()}
          <button
            onClick={() => setInventoryOpen(true)}
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              width: 60,
              height: 60,
              background: "none",
              border: "none",
              cursor: "pointer",
              zIndex: 1000,
            }}
          >
            <img
              src="/assets/inventory.png"
              alt="Inventory"
              style={{
                width: 40,
                height: 40,
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: 10,
                borderRadius: 20,
              }}
            />
          </button>
        </div>
        {inventoryOpen && (
          <InventoryModal
            items={props.inventoryItems}
            onClose={() => setInventoryOpen(false)}
            onUseItem={useItem}
          />
        )}
      </div>
      <div
        id="sidebar"
        ref={sidebarRef}
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minWidth: 320,
          width: 320,
          height: GAME_AREA_HEIGHT,
          padding: 16,
          boxSizing: "border-box",
          color: "white",
          fontWeight: "bold",
          fontSize: 20,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          overflowY: "auto",
        }}
      >
        {currentLocation && (
          <>
            <div style={{ fontWeight: "bold", fontSize: 26 }}>
              You are at {currentLocation}
            </div>
            <div>
              <div style={{ fontWeight: "bold", fontSize: 22 }}>Aktivitas</div>
              {activities[currentLocation].map((act, index) => {
                const activityId = `${currentLocation}-${index}`;
                const count =
                  (activityCounter[currentLocation] &&
                    activityCounter[currentLocation][activityId]) ||
                  0;
                return (
                  <div
                    key={activityId}
                    style={{
                      backgroundColor: "rgba(0,0,0,0.3)",
                      borderRadius: 8,
                      padding: 8,
                      marginTop: 4,
                      cursor:
                        count < activityMax && !isActivityRunning
                          ? "pointer"
                          : "not-allowed",
                      position: "relative",
                      opacity: isActivityRunning ? 0.6 : 1,
                    }}
                    onClick={() =>
                      count < activityMax &&
                      !isActivityRunning &&
                      startActivity(currentLocation, index, act)
                    }
                    onMouseEnter={() => setHoveredDescription(activityId)}
                    onMouseLeave={() => setHoveredDescription(null)}
                  >
                    {act.icon} {act.name}
                    {hoveredDescription === activityId && (
                      <div
                        style={{
                          position: "absolute",
                          backgroundColor: "rgba(255,255,255,0.9)",
                          color: "black",
                          fontWeight: "normal",
                          padding: 8,
                          borderRadius: 8,
                          maxWidth: 300,
                          top: "100%",
                          left: 0,
                          zIndex: 9999,
                          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                        }}
                      >
                        {getDescription(act)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
