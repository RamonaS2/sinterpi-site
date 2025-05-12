import React, { useState } from 'react';
import styles from './Cadastro.module.css';

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar lógica para enviar os dados para o servidor
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastro de Afiliado</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome Completo"
          className={styles.input}
          value={formData.nome}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          className={styles.input}
          value={formData.senha}
          onChange={handleChange}
        />
        <button type="submit" className={styles.button}>
          Cadastrar
        </button>
      </form>
      <p className={styles.message}>
        Já tem uma conta? <a href="/">Faça login</a>
      </p>
    </div>
  );
}

export default Cadastro;
