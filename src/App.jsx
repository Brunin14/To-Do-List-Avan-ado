import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './Pages/TodoList';
import Pomodoro from './Pages/Pomodoro';
import Notes from './Pages/Notes';
import Dashboard from './Pages/Dashboard';
import './Pages/style.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <Router>
      <div className="app-wrapper">
        <header className="app-header">
          <button onClick={() => setDarkMode(prev => !prev)} className="theme-toggle">
            {darkMode ? '🌞 Modo Claro' : '🌙 Modo Escuro'}
          </button>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/todo" element={<TodoList tasks={tasks} setTasks={setTasks} />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
