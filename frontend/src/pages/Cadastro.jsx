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
      nome: "", cpf: "", rg: "", nascimento: "", email: "", telefone: "",
      municipio: "", cargo: "", localTrabalho: "", matricula: "", orgao: "",
      sindicalizar: false,
    });
    setArquivos({ identidade: null, pedido: null, comprovante: null });
    if (identidadeRef.current) identidadeRef.current.value = "";
    if (pedidoRef.current) pedidoRef.current.value = "";
    if (comprovanteRef.current) comprovanteRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    // Adicionar TODOS os campos de texto do formData
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    // Adicionar arquivos
    if (arquivos.identidade) data.append('identidade', arquivos.identidade);
    if (arquivos.pedido) data.append('pedido', arquivos.pedido);
    if (arquivos.comprovante) data.append('comprovante', arquivos.comprovante);

    try {
      await axios.post('http://localhost:3001/api/afiliados', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Cadastro realizado com sucesso!');
      resetForm();
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cadastro de Afiliados</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="nome" placeholder="Nome Completo" value={formData.nome} onChange={handleChange} required />
        <input name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} required />
        <input name="municipio" placeholder="Município" value={formData.municipio} onChange={handleChange} required />

        <input name="rg" placeholder="RG" value={formData.rg} onChange={handleChange} />
        <label>
        Data de Nascimento:
        <input 
          name="nascimento" type="date" // <--- Importante: Garante o formato de data
          value={formData.nascimento}
          onChange={handleChange}
        />  
        </label>    
        <input name="cargo" placeholder="Cargo" value={formData.cargo} onChange={handleChange} />
        <input name="localTrabalho" placeholder="Local de Trabalho" value={formData.localTrabalho} onChange={handleChange} />
        <input name="matricula" placeholder="Matrícula" value={formData.matricula} onChange={handleChange} />
        <input name="orgao" placeholder="Órgão" value={formData.orgao} onChange={handleChange} />

        <label className={styles.checkboxLabel}>
          Desejo me Sindicalizar
          <input
            type="checkbox"
            name="sindicalizar"
            checked={formData.sindicalizar}
            onChange={handleChange}
          />
        </label>

        {/* Campos de upload de arquivo */}
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
    </div>
  );
};

export default Cadastro;