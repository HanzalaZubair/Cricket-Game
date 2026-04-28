import React, { useState } from "react";
import "./styles/App.css";
import Scoreboard from "./components/Scoreboard";
import PowerBar from "./components/PowerBar";

function App() {
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);
  const [style, setStyle] = useState("aggressive");
  const [ballPosition, setBallPosition] = useState("initial"); 

  const handleShotPlayed = (result) => {
    if (result === "wicket") setWickets(wickets + 1);
    else {
      const runMap = { zero: 0, one: 1, two: 2, three: 3, four: 4, six: 6 };
      setRuns(runs + runMap[result]);
    }
    setBalls(balls + 1);
  };

  const restartGame = () => {
    setRuns(0);
    setWickets(0);
    setBalls(0);
    setStyle("aggressive");
    setBallPosition("initial");
  };

  const bowlBall = () => {
    setBallPosition("bowled");
  };

  return (
    <div className="game-container">

      <img src="/images/ground.jpg" alt="ground" className="ground" />
      <img src="/images/player.png" alt="player" className="player" />

      <img
        src="/images/ball.png"
        alt="ball"
        className={`ball ${ballPosition === "bowled" ? "move-ball" : ""}`}
      />

      <Scoreboard runs={runs} wickets={wickets} balls={balls} />

      <div className="controls">
        <button
          className={style === "aggressive" ? "active" : ""}
          onClick={() => setStyle("aggressive")}
        >
          Aggressive
        </button>

        <button
          className={style === "defensive" ? "active" : ""}
          onClick={() => setStyle("defensive")}
        >
          Defensive
        </button>

        <button onClick={restartGame}>Restart</button>
        <button onClick={bowlBall}>Bowl Ball</button>
      </div>

      <PowerBar style={style} onShotPlayed={handleShotPlayed} />

    </div>
  );
}

export default App;