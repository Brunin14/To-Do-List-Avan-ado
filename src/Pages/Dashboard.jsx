import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import './Dashboard.css';

function Dashboard() {
  const [taskStats, setTaskStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [pomodoroStats, setPomodoroStats] = useState({ sessions: 0, minutes: 0 });
  const [notesStats, setNotesStats] = useState({ total: 0 });

  // Carrega dados do localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const completed = storedTasks.filter(t => t.done).length;
    const pending = storedTasks.filter(t => !t.done).length;

    setTaskStats({
      total: storedTasks.length,
      completed,
      pending,
    });

    const storedPomodoroSessions = Number(localStorage.getItem('pomodoro_sessions')) || 0;
    const storedPomodoroMinutes = Number(localStorage.getItem('pomodoro_minutes')) || 0;

    setPomodoroStats({
      sessions: storedPomodoroSessions,
      minutes: storedPomodoroMinutes,
    });

    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotesStats({
      total: storedNotes.length,
    });
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📊 Produtividade Avançada</h1>
      <p className="dashboard-subtitle">Resumo das suas atividades:</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>🧩 Tarefas</h2>
          <p>Total: {taskStats.total}</p>
          <p>✅ Concluídas: {taskStats.completed}</p>
          <p>🕓 Pendentes: {taskStats.pending}</p>
        </div>
        <div className="stat-card">
          <h2>⏱️ Pomodoro</h2>
          <p>Sessões realizadas: {pomodoroStats.sessions}</p>
          <p>Tempo total focado: {pomodoroStats.minutes} min</p>
        </div>
        <div className="stat-card">
          <h2>📝 Anotações</h2>
          <p>Total de notas: {notesStats.total}</p>
        </div>
      </div>

      <div className="card-grid">
        <Link to="/todo" className="tool-card">📋 Acessar Tarefas</Link>
        <Link to="/pomodoro" className="tool-card">⏱️ Ir para Pomodoro</Link>
        <Link to="/notes" className="tool-card">📝 Abrir Caderno</Link>
      </div>


    </div>
  );
}

export default Dashboard;
