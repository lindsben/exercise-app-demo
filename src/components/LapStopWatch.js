import React, { useState, useEffect, useCallback } from "react";

export default function StopWatch() {
  const [running, setRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [laps, setLaps] = useState([]);

  const updateTimer = useCallback(() => {
    if (running) {
      setTimer((timer) => timer + 10);
    }
  }, [running]);

  useEffect(() => {
    const currentTimer = setInterval(updateTimer, 10);
    return () => clearInterval(currentTimer);
  }, [running]);

  const startStop = useCallback(() => {
    setRunning(!running);
  }, [running]);

  const reset = useCallback(() => {
    setTimer(0);
    setLaps([]);
  }, []);

  const recordLap = useCallback(() => {
    if (running) {
      setLaps((prevLaps) => [...prevLaps, timer]);
    }
  }, [running, timer]);

  const clearLaps = useCallback(() => {
    setLaps([]);
  }, []);

  const formatTime = (lap) => {
    const mins = Math.floor((lap / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    const secs = Math.floor((lap / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const mills = (lap % 1000).toString().padStart(3, "0");
    return `${mins}:${secs}.${mills}`;
  };

  return (
    <div style={{ width: "100vw", textAlign: "center" }}>
      <p style={{ fontSize: "2em", margin: "auto" }}>
        {Math.floor((timer / (1000 * 60)) % 60)
          .toString()
          .padStart(2, "0")}
        :
        {Math.floor((timer / 1000) % 60)
          .toString()
          .padStart(2, "0")}
        :{(timer % 1000).toString().padStart(3, "0")}
      </p>
      <button onClick={startStop}>{running ? "Pause" : "Start"}</button>
      <button onClick={reset}>Reset</button>
      <button onClick={recordLap} disabled={!running}>
        Lap
      </button>
      <button onClick={clearLaps}>Clear Laps</button>
      {laps.length > 0 && (
        <div>
          <p>Lap Times:</p>
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>
                Lap {index + 1}: {formatTime(lap)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
