import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../Components/BackButton';


function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Produtividade Avançada</h1>
      <p>Escolha uma ferramenta:</p>
      <div className="card-grid">
        <Link to="/todo" className="card">📋 Lista de Tarefas</Link>
        <Link to="/pomodoro" className="card">⏱️ Pomodoro</Link>
        <Link to="/notes" className="card">📝 Anotações</Link>
      </div>
      <BackButton />
    </div>
  );
}

export default Dashboard;
