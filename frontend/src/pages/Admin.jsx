// frontend/src/pages/Admin.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.css'; 

function Admin() {
  const [afiliados, setAfiliados] = useState([]);
  const navigate = useNavigate();

  const buscarAfiliados = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Sessão expirada ou não autenticada. Faça login novamente.');
        navigate('/login');
        return;
      }
      const resposta = await axios.get('http://localhost:3001/api/afiliados', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAfiliados(resposta.data);
    } catch (erro) {
      console.error('Erro ao buscar afiliados:', erro);
      if (erro.response && (erro.response.status === 401 || erro.response.status === 403)) {
        alert('Você não tem autorização. Faça login novamente.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        alert('Erro ao buscar afiliados.');
      }
    }
  };

  const excluirAfiliado = async (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este afiliado?');
    if (!confirmar) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Sessão expirada ou não autenticada. Faça login novamente.');
        navigate('/login');
        return;
      }
      await axios.delete(`http://localhost:3001/api/afiliados/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAfiliados((prev) => prev.filter((afiliado) => afiliado.id !== id));
      alert('Afiliado excluído com sucesso!');
    } catch (erro) {
      console.error('Erro ao excluir afiliado:', erro);
      if (erro.response && (erro.response.status === 401 || erro.response.status === 403)) {
        alert('Você não tem autorização. Faça login novamente.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        alert('Erro ao excluir afiliado.');
      }
    }
  };

  const handleDownload = async (tipo, nomeArquivo) => { // 'tipo' não será mais usado na URL
    if (!nomeArquivo) {
      alert(`Nenhum arquivo de ${tipo} disponível.`);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Sessão expirada ou não autenticada. Faça login novamente.');
        navigate('/login');
        return;
      }
      const response = await axios.get(`http://localhost:3001/api/afiliados/download/${nomeArquivo}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob', // Importante para baixar arquivos
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nomeArquivo);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Erro ao baixar ${tipo}:`, error);
      if (error.response && error.response.status === 404) {
        alert(`Arquivo de ${tipo} não encontrado.`);
      } else if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        alert('Você não tem autorização para baixar. Faça login novamente.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        alert(`Erro ao baixar arquivo de ${tipo}.`);
      }
    }
  };


  useEffect(() => {
    buscarAfiliados();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Painel Administrativo - Lista de Afiliados</h2>
      {afiliados.length === 0 ? (
        <p>Nenhum afiliado encontrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Município</th>
              <th>Documentos</th>
              <th>Ações</th>
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
                <td>
                  {afiliado.identidade && (
                    <button onClick={() => handleDownload('identidade', afiliado.identidade)}>
                      Identidade
                    </button>
                  )}{' '}
                  {afiliado.pedido && (
                    <button onClick={() => handleDownload('pedido', afiliado.pedido)}>
                      Pedido
                    </button>
                  )}{' '}
                  {afiliado.comprovante && (
                    <button onClick={() => handleDownload('comprovante', afiliado.comprovante)}>
                      Comprovante
                    </button>
                  )}
                </td>
                <td>
                  <button onClick={() => excluirAfiliado(afiliado.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Admin;