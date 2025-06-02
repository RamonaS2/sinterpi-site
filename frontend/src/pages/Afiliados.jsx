import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Afiliados.module.css";

const Afiliados = () => {
  const [afiliados, setAfiliados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarAfiliados = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/afiliados");
        setAfiliados(response.data);
      } catch (error) {
        console.error("Erro ao buscar afiliados:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarAfiliados();
  }, []);

  if (loading) return <p>Carregando afiliados...</p>;

  return (
    <div className={styles.container}>
      <h2>Lista de Afiliados</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Município</th>
          </tr>
        </thead>
        <tbody>
          {afiliados.map((afiliado) => (
            <tr key={afiliado.id}>
              <td>{afiliado.nome}</td>
              <td>{afiliado.cpf}</td>
              <td>{afiliado.email}</td>
              <td>{afiliado.telefone}</td>
              <td>{afiliado.municipio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Afiliados;
