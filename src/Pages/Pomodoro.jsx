import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import BackButton from '../Components/BackButton';
import './Pomodoro.css';

function Pomodoro() {
  const { usuario } = useContext(AuthContext);
  const storagePrefix = `pomodoro_${usuario?.email || 'anonimo'}_`;

  const [endTime, setEndTime] = useState(() => Number(localStorage.getItem(storagePrefix + 'endTime')) || null);
  const [running, setRunning] = useState(() => localStorage.getItem(storagePrefix + 'running') === 'true');
  const [hasStarted, setHasStarted] = useState(() => localStorage.getItem(storagePrefix + 'hasStarted') === 'true');
  const [duration, setDuration] = useState(() => Number(localStorage.getItem(storagePrefix + 'duration')) || 25 * 60);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem(storagePrefix + 'running', running ? 'true' : 'false');
    localStorage.setItem(storagePrefix + 'hasStarted', hasStarted ? 'true' : 'false');
    localStorage.setItem(storagePrefix + 'duration', duration.toString());

    if (running) {
      localStorage.setItem(storagePrefix + 'endTime', endTime);
    }
  }, [running, hasStarted, duration, endTime, storagePrefix]);

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

    localStorage.removeItem(storagePrefix + 'endTime');
    localStorage.removeItem(storagePrefix + 'running');
    localStorage.removeItem(storagePrefix + 'hasStarted');
    localStorage.removeItem(storagePrefix + 'duration');
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
