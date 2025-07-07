import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // <-- importei useNavigate
import BackButton from '../Components/BackButton';
import './Dashboard.css';

function Dashboard({ usuario }) {
  const navigate = useNavigate(); // hook para navegar programaticamente

  const [taskStats, setTaskStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [pomodoroStats, setPomodoroStats] = useState({ sessions: 0, minutes: 0 });
  const [notesStats, setNotesStats] = useState({ total: 0 });

  useEffect(() => {
    if (!usuario || !usuario.email) return;

    // Use chave personalizada para o usuário
    const tasksKey = `tasks_${usuario.email}`;
    const pomodoroSessionsKey = `pomodoro_${usuario.email}_sessions`;
    const pomodoroMinutesKey = `pomodoro_${usuario.email}_minutes`;
    const notesKey = `notes_${usuario.email}`;

    // Tarefas
    const storedTasks = JSON.parse(localStorage.getItem(tasksKey)) || [];
    const completed = storedTasks.filter(t => t.done).length;
    const pending = storedTasks.filter(t => !t.done).length;

    setTaskStats({
      total: storedTasks.length,
      completed,
      pending,
    });

    // Pomodoro (ajuste aqui de acordo com seu app, veja se realmente está salvando esses dados)
    const storedPomodoroSessions = Number(localStorage.getItem(pomodoroSessionsKey)) || 0;
    const storedPomodoroMinutes = Number(localStorage.getItem(pomodoroMinutesKey)) || 0;

    setPomodoroStats({
      sessions: storedPomodoroSessions,
      minutes: storedPomodoroMinutes,
    });

    // Notas
    const storedNotes = JSON.parse(localStorage.getItem(notesKey)) || [];
    setNotesStats({
      total: storedNotes.length,
    });
  }, [usuario]);

  function handleLogout() {
    // Limpa dados do usuário — adapte para seu caso
    localStorage.removeItem('usuario'); // chave do usuário
    // Opcional: limpar os dados específicos desse usuário
    // localStorage.removeItem(`tasks_${usuario.email}`);
    // localStorage.removeItem(`pomodoro_${usuario.email}_sessions`);
    // localStorage.removeItem(`pomodoro_${usuario.email}_minutes`);
    // localStorage.removeItem(`notes_${usuario.email}`);

    navigate('/login');
  }

  if (!usuario) {
    // Se por algum motivo usuario não existir, redirecione
    navigate('/login');
    return null;
  }

  return (
    <div className="dashboard-container">
      <BackButton />
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

      {/* Botão Sair */}

    </div>
  );
}

export default Dashboard;
