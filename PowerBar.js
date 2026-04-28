import React, { useEffect, useState } from "react";
import "./PowerBar.css";

function PowerBar({ style = "aggressive", onShotPlayed }) {
  const probabilities = {
    aggressive: [
      { key: "wicket", prob: 0.4, color: "red" },
      { key: "zero", prob: 0.1, color: "lightgray" },
      { key: "one", prob: 0.1, color: "white" },
      { key: "two", prob: 0.1, color: "gray" },
      { key: "three", prob: 0.05, color: "orange" },
      { key: "four", prob: 0.1, color: "yellow" },
      { key: "six", prob: 0.15, color: "green" },
    ],
    defensive: [
      { key: "wicket", prob: 0.1, color: "red" },
      { key: "zero", prob: 0.3, color: "lightgray" },
      { key: "one", prob: 0.3, color: "white" },
      { key: "two", prob: 0.2, color: "gray" },
      { key: "three", prob: 0.05, color: "orange" },
      { key: "four", prob: 0.04, color: "yellow" },
      { key: "six", prob: 0.01, color: "green" },
    ],
  };

  const [sliderPos, setSliderPos] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const barWidth = 200; 
    const sliderWidth = 10;

    const animate = () => {
      setSliderPos((prev) => {
        let next = prev + direction * 2;
        if (next > barWidth - sliderWidth || next < 0) {
          setDirection(-direction);
          next = prev - direction * 2;
        }
        return next;
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, [direction]);

  const handleClick = () => {
    const barWidth = 200;
    const percent = sliderPos / barWidth;

    let cumulative = 0;
    let result = "zero";
    for (let seg of probabilities[style]) {
      cumulative += seg.prob;
      if (percent <= cumulative) {
        result = seg.key;
        break;
      }
    }

    if (onShotPlayed) onShotPlayed(result);
  };

  return (
    <div className="powerbar" onClick={handleClick}>
      {probabilities[style].map((seg) => (
        <div
          key={seg.key}
          className="segment"
          style={{ flex: seg.prob, backgroundColor: seg.color }}
        ></div>
      ))}
      <div className="slider" style={{ left: sliderPos }}></div>
    </div>
  );
}

export default PowerBar;