// src/Components/BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <div className="back-button-wrapper">
      <button
        onClick={() => navigate('/')}
        className="back-button"
        aria-label="Voltar para o início"
      >
        <span className="back-icon">⬅️</span> Voltar
      </button>
    </div>
  );
}

export default BackButton;
