import React, { useState, useRef } from "react";
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

  const [loading, setLoading] = useState(false);

  // Referências para inputs de arquivos
  const identidadeRef = useRef(null);
  const pedidoRef = useRef(null);
  const comprovanteRef = useRef(null);

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

  const resetForm = () => {
    setFormData({
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
    setArquivos({
      identidade: null,
      pedido: null,
      comprovante: null,
    });

    // Resetar campos de arquivos
    if (identidadeRef.current) identidadeRef.current.value = "";
    if (pedidoRef.current) pedidoRef.current.value = "";
    if (comprovanteRef.current) comprovanteRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar cadastro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Cadastro de Afiliado</h2>
      <input name="nome" placeholder="Nome completo" value={formData.nome} onChange={handleChange} required />
      <input name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} required />
      <input name="rg" placeholder="RG" value={formData.rg} onChange={handleChange} required />
      <input type="date" name="nascimento" value={formData.nascimento} onChange={handleChange} required />
      <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required />
      <input name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} required />
      <input name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} required />
      <input name="municipio" placeholder="Município" value={formData.municipio} onChange={handleChange} required />
      <input name="cargo" placeholder="Cargo/Função" value={formData.cargo} onChange={handleChange} required />
      <input name="localTrabalho" placeholder="Local de trabalho" value={formData.localTrabalho} onChange={handleChange} required />
      <input name="matricula" placeholder="Matrícula" value={formData.matricula} onChange={handleChange} required />
      <input name="orgao" placeholder="Órgão/Instituição" value={formData.orgao} onChange={handleChange} required />
      <label>
        <input
          type="checkbox"
          name="sindicalizar"
          checked={formData.sindicalizar}
          onChange={handleChange}
        />
        Desejo me sindicalizar
      </label>

      <label>
        Carteira de Identidade:
        <input
          type="file"
          name="identidade"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          ref={identidadeRef}
          required
        />
      </label>

      <label>
        Pedido de Afiliação Assinado:
        <input
          type="file"
          name="pedido"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          ref={pedidoRef}
          required
        />
      </label>

      <label>
        Comprovante de Endereço:
        <input
          type="file"
          name="comprovante"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          ref={comprovanteRef}
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};

export default Cadastro;
