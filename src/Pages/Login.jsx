import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import './auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false); // novo estado
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    try {
      const resposta = await fetch('https://backend-flask-u1dw.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const data = await resposta.json();

      if (resposta.ok) {
        login({ email });
        navigate('/');
      } else {
        setMensagem(data.erro);
        setLoading(false);
      }
    } catch (error) {
      setMensagem('Erro na conexão. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />

        {loading ? (
          <div className="spinner"></div> // spinner no lugar do botão
        ) : (
          <button type="submit">Entrar</button>
        )}

        <p className="mensagem">{mensagem}</p>
        <p className="link-cadastro">
          Não tem conta?{' '}
          <span onClick={() => navigate('/cadastro')} className="link">Criar agora</span>
        </p>
      </form>
    </div>
  );
}

export default Login;
