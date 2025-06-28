import React, { useState, useEffect } from 'react';
import BackButton from '../Components/BackButton';

function Pomodoro() {
  const [endTime, setEndTime] = useState(() => {
    const saved = localStorage.getItem('pomodoro_endTime');
    return saved ? Number(saved) : null;
  });

  const [running, setRunning] = useState(() => {
    const saved = localStorage.getItem('pomodoro_running');
    return saved === 'true';
  });

  const [hasStarted, setHasStarted] = useState(() => {
    return localStorage.getItem('pomodoro_hasStarted') === 'true';
  });

  const [duration, setDuration] = useState(() => {
    const saved = localStorage.getItem('pomodoro_duration');
    return saved ? Number(saved) : 25 * 60; // default 25 min
  });

  const [now, setNow] = useState(Date.now());

  // Atualiza o tempo a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Atualiza localStorage sempre que necessário
  useEffect(() => {
    if (running) {
      localStorage.setItem('pomodoro_endTime', endTime);
      localStorage.setItem('pomodoro_running', 'true');
      localStorage.setItem('pomodoro_hasStarted', 'true');
      localStorage.setItem('pomodoro_duration', duration);
    }
  }, [running, endTime, duration]);

  const getRemainingSeconds = () => {
    if (!endTime) return duration;
    return Math.max(0, Math.floor((endTime - now) / 1000));
  };

  const startTimer = () => {
    const end = Date.now() + duration * 1000;
    setEndTime(end);
    setRunning(true);
    setHasStarted(true);
    localStorage.setItem('pomodoro_running', 'true');
    localStorage.setItem('pomodoro_hasStarted', 'true');
    localStorage.setItem('pomodoro_endTime', end);
    localStorage.setItem('pomodoro_duration', duration);
  };

  const pauseTimer = () => {
    const remaining = getRemainingSeconds();
    setRunning(false);
    setDuration(remaining);
    setEndTime(null);
    localStorage.setItem('pomodoro_running', 'false');
    localStorage.setItem('pomodoro_duration', remaining);
  };

  const resumeTimer = () => {
    const newEnd = Date.now() + duration * 1000;
    setEndTime(newEnd);
    setRunning(true);
    localStorage.setItem('pomodoro_endTime', newEnd);
    localStorage.setItem('pomodoro_running', 'true');
  };

  const resetTimer = () => {
    setRunning(false);
    setHasStarted(false);
    setEndTime(null);
    setDuration(25 * 60);
    localStorage.removeItem('pomodoro_running');
    localStorage.removeItem('pomodoro_endTime');
    localStorage.removeItem('pomodoro_hasStarted');
    localStorage.removeItem('pomodoro_duration');
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const remaining = getRemainingSeconds();

  return (
    <div>
      <BackButton />
      <h1>⏱️ Pomodoro</h1>

      {!hasStarted ? (
        <div style={{ marginTop: '1rem' }}>
          <label>Minutos: </label>
          <input
            type="number"
            min={1}
            value={duration / 60}
            onChange={(e) => setDuration(Number(e.target.value) * 60)}
            style={{ padding: '8px', borderRadius: '8px', width: '60px', marginRight: '10px' }}
          />
          <button onClick={startTimer}>Iniciar</button>
        </div>
      ) : (
        <>
          <h2 style={{ fontSize: '3rem', margin: '1rem 0' }}>{formatTime(remaining)}</h2>
          <button onClick={running ? pauseTimer : resumeTimer}>
            {running ? 'Pausar' : 'Continuar'}
          </button>
          <button onClick={resetTimer} style={{ marginLeft: '10px' }}>
            Resetar
          </button>
        </>
      )}
    </div>
  );
}

export default Pomodoro;
