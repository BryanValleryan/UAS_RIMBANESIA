import React, { useState } from "react";

const maxchar = 3;

export default function StartScreen({ onStart, character, setCharacter }) {
  const [name, setName] = useState("");

  const changeChar = (dir) => {
    let newChar = character + dir;
    if (newChar < 0) newChar = 0;
    if (newChar > maxchar) newChar = maxchar;
    setCharacter(newChar);
  };

  const handleStart = () => {
    if (!name.trim()) {
      alert("Masukkan Nama Anda dengan Benar!");
      return;
    }
    onStart(name, character);
  };

  return (
    <div id="loginDisplay">
      <h1>WELCOME TO OUR GAME</h1>
      <div id="startScreen">
        <div id="pilihkarakter">
          <button onClick={() => changeChar(-1)}>
            <img src="/assets/arrow-left-right.png" alt="Left" id="panahkiri" />
          </button>
          <img src={`/assets/${character}.gif`} id="karakter" alt="Karakter" />
          <button onClick={() => changeChar(1)}>
            <img src="/assets/arrow-left-right.png" alt="Right" />
          </button>
        </div>
        <div id="namaplayer">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name here..."
          />
        </div>
        <div id="tombolstart">
          <button onClick={handleStart}>
            <p>Start Exploring</p>
          </button>
        </div>
      </div>
    </div>
  );
}
