// src/Components/BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate('/')} className="back-button">
      ⬅️ Voltar
    </button>
  );
}

export default BackButton;
