import React, { useState } from "react";
import axios from "axios";
import styles from "./Cadastro.module.css";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    rg: "",
    nascimento: "",
    email: "",
    telefone: "",
    endereco: "",
    municipio: "",
    cargo: "",
    localTrabalho: "",
    matricula: "",
    orgao: "",
    sindicalizar: false,
  });

  const [arquivos, setArquivos] = useState({
    identidade: null,
    pedido: null,
    comprovante: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setArquivos((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dados = new FormData();
    for (const key in formData) {
      dados.append(key, formData[key]);
    }

    dados.append("identidade", arquivos.identidade);
    dados.append("pedido", arquivos.pedido);
    dados.append("comprovante", arquivos.comprovante);

    try {
      await axios.post("http://localhost:3001/api/cadastro", dados);
      alert("Cadastro enviado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar cadastro.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Cadastro de Afiliado</h2>
      <input name="nome" placeholder="Nome completo" onChange={handleChange} required />
      <input name="cpf" placeholder="CPF" onChange={handleChange} required />
      <input name="rg" placeholder="RG" onChange={handleChange} required />
      <input type="date" name="nascimento" onChange={handleChange} required />
      <input type="email" name="email" placeholder="E-mail" onChange={handleChange} required />
      <input name="telefone" placeholder="Telefone" onChange={handleChange} required />
      <input name="endereco" placeholder="Endereço" onChange={handleChange} required />
      <input name="municipio" placeholder="Município" onChange={handleChange} required />
      <input name="cargo" placeholder="Cargo/Função" onChange={handleChange} required />
      <input name="localTrabalho" placeholder="Local de trabalho" onChange={handleChange} required />
      <input name="matricula" placeholder="Matrícula" onChange={handleChange} required />
      <input name="orgao" placeholder="Órgão/Instituição" onChange={handleChange} required />
      <label>
        <input type="checkbox" name="sindicalizar" onChange={handleChange} />
        Desejo me sindicalizar
      </label>

      <label>
        Carteira de Identidade:
        <input type="file" name="identidade" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} required />
      </label>

      <label>
        Pedido de Afiliação Assinado:
        <input type="file" name="pedido" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} required />
      </label>

      <label>
        Comprovante de Endereço:
        <input type="file" name="comprovante" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} required />
      </label>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default Cadastro;
