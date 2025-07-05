import React, { useState, useEffect } from 'react';
import BackButton from '../Components/BackButton';
import './Pomodoro.css';

function Pomodoro() {
  const [endTime, setEndTime] = useState(() => Number(localStorage.getItem('pomodoro_endTime')) || null);
  const [running, setRunning] = useState(() => localStorage.getItem('pomodoro_running') === 'true');
  const [hasStarted, setHasStarted] = useState(() => localStorage.getItem('pomodoro_hasStarted') === 'true');
  const [duration, setDuration] = useState(() => Number(localStorage.getItem('pomodoro_duration')) || 25 * 60);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (running) {
      localStorage.setItem('pomodoro_endTime', endTime);
      localStorage.setItem('pomodoro_running', 'true');
      localStorage.setItem('pomodoro_hasStarted', 'true');
      localStorage.setItem('pomodoro_duration', duration);
    }
  }, [running, endTime, duration]);

  const getRemainingSeconds = () => {
    return endTime ? Math.max(0, Math.floor((endTime - now) / 1000)) : duration;
  };

  const formatTime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${m}:${sec}`;
  };

  const startTimer = () => {
    const end = Date.now() + duration * 1000;
    setEndTime(end);
    setRunning(true);
    setHasStarted(true);
  };

  const pauseTimer = () => {
    const remaining = getRemainingSeconds();
    setRunning(false);
    setDuration(remaining);
    setEndTime(null);
  };

  const resumeTimer = () => {
    setEndTime(Date.now() + duration * 1000);
    setRunning(true);
  };

  const resetTimer = () => {
    setRunning(false);
    setHasStarted(false);
    setEndTime(null);
    setDuration(25 * 60);
    localStorage.clear();
  };

  const remaining = getRemainingSeconds();

  return (
    <div className="pomodoro-container">
      <BackButton />
      <h1 className="pomodoro-title">⏱️ Pomodoro</h1>

      {!hasStarted ? (
        <div className="setup-section">
          <label htmlFor="durationInput">Minutos:</label>
          <input
            id="durationInput"
            type="number"
            min={1}
            value={duration / 60}
            onChange={(e) => setDuration(Number(e.target.value) * 60)}
            className="duration-input"
          />
          <button className="start-button" onClick={startTimer}>🎯 Iniciar</button>
        </div>
      ) : (
        <div className="timer-section">
          <h2 className="time-display">{formatTime(remaining)}</h2>
          <div className="timer-buttons">
            <button onClick={running ? pauseTimer : resumeTimer}>
              {running ? '⏸️ Pausar' : '▶️ Continuar'}
            </button>
            <button onClick={resetTimer}>🔄 Resetar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pomodoro;
