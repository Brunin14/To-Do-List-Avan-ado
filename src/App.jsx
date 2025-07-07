import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import TodoList from './Pages/TodoList';
import Pomodoro from './Pages/Pomodoro';
import Notes from './Pages/Notes';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Cadastro from './Pages/Cadastro';
import RotaProtegida from './Components/RotaProtegida';

import { AuthProvider, AuthContext } from './Context/AuthContext';
import './Pages/style.css';

function AppContent() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const { usuario, logout } = useContext(AuthContext);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  if (!usuario) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className="app-wrapper">
      <header className="app-header" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', alignItems: 'center' }}>
        <button
          onClick={() => setDarkMode(prev => !prev)}
          className="theme-toggle"
          aria-label="Alternar tema claro/escuro"
        >
          {darkMode ? '🌞 Modo Claro' : '🌙 Modo Escuro'}
        </button>
        <button
          onClick={logout}
          className="logout-button"
          aria-label="Sair da aplicação"
        >
          Sair
        </button>
      </header>

      <Routes>
        <Route path="/" element={<RotaProtegida><Dashboard usuario={usuario} /></RotaProtegida>} />
        <Route path="/todo" element={<RotaProtegida><TodoList usuario={usuario} /></RotaProtegida>} />
        <Route path="/pomodoro" element={<RotaProtegida><Pomodoro usuario={usuario} /></RotaProtegida>} />
        <Route path="/notes" element={<RotaProtegida><Notes usuario={usuario} /></RotaProtegida>} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/cadastro" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
