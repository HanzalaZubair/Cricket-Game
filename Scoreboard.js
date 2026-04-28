import React from "react";
import "./Scoreboard.css";

function Scoreboard({ runs, wickets, balls }) {
  return (
    <div className="scoreboard">
      <h2>Runs: {runs}</h2>
      <h2>Wickets: {wickets}</h2>
      <h2>Balls: {balls}/12</h2>
    </div>
  );
}

export default Scoreboard;