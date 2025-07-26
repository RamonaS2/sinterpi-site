import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 


function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resposta = await axios.post(`${API_BASE_URL}/admin/login`, { usuario, senha });
      localStorage.setItem('token', resposta.data.token);
      alert('Login realizado com sucesso!');
      navigate('/admin'); 
    } catch (error) {
      console.error('Erro de login:', error); 
      alert('Usuário ou senha inválidos.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login Administrativo</h2>
      <input
        type="text"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        placeholder="Usuário"
        required
      />
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Senha"
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}

export default Login;