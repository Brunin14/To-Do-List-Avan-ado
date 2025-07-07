import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css'; // Importa o CSS que estiliza o formulário

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      setMensagem('Por favor, preencha todos os campos');
      return;
    }

    try {
      const resposta = await fetch('https://backend-flask-u1dw.onrender.com/api/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await resposta.json();

      if (resposta.ok) {
        setMensagem(data.mensagem);
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMensagem(data.erro);
      }
    } catch (error) {
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
        <p className="mensagem">{mensagem}</p>
        <p className="link-cadastro">
          Já tem conta?{' '}
          <span onClick={() => navigate('/login')} className="link">
            Entrar
          </span>
        </p>
      </form>
    </div>
  );
}

export default Cadastro;
