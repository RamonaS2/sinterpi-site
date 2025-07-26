import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.css'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

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
      const resposta = await axios.get(`${API_BASE_URL}/afiliados`, {
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
      await axios.delete(`${API_BASE_URL}/afiliados/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAfiliados((prev) => prev.filter((afiliado) => afiliado.id !== id));
      alert('Afiliado excluído com sucesso!');
    } catch (erro) {
      console.error('Erro ao excluir afiliado:', erro);
      if (erro.response && (erro.response.status === 401 || erro.response.status === 403)) {
        alert('Erro ao excluir afiliado. Faça login novamente.'); // Mudei a mensagem para refletir a necessidade de login
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        alert('Erro ao excluir afiliado.');
      }
    }
  };

  const handleDownload = async (tipo, nomeArquivo) => {
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
      const response = await axios.get(`${API_BASE_URL}/afiliados/download/${nomeArquivo}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob',
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

  // === NOVA FUNÇÃO PARA LOGOUT ===
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    alert('Sessão encerrada com sucesso!');
    navigate('/login'); // Redireciona para a página de login
  };

  useEffect(() => {
    buscarAfiliados();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.adminHeader}> 
        <h2>Painel Administrativo - Lista de Afiliados</h2>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
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
              <th>RG</th> 
              <th>Nascimento</th>
              <th>Cargo</th>
              <th>Local de Trabalho</th>
              <th>Matrícula</th>
              <th>Órgão</th>
              <th>Sindicalizar</th>
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
                <td>{afiliado.rg}</td> 
                <td>{afiliado.nascimento ? new Date(afiliado.nascimento).toLocaleDateString() : 'N/A'}</td> 
                <td>{afiliado.cargo}</td>
                <td>{afiliado.localTrabalho}</td>
                <td>{afiliado.matricula}</td>
                <td>{afiliado.orgao}</td>
                <td>{afiliado.sindicalizar ? 'Sim' : 'Não'}</td> 
                <td>
                  {afiliado.identidade && (
                    <button onClick={() => handleDownload('identidade', afiliado.identidade)} className={styles.downloadButton}>
                      Identidade
                    </button>
                  )}{' '}
                  {afiliado.pedido && (
                    <button onClick={() => handleDownload('pedido', afiliado.pedido)} className={styles.downloadButton}>
                      Pedido
                    </button>
                  )}{' '}
                  {afiliado.comprovante && (
                    <button onClick={() => handleDownload('comprovante', afiliado.comprovante)} className={styles.downloadButton}>
                      Comprovante
                    </button>
                  )}
                </td>
                <td>
                  <button onClick={() => excluirAfiliado(afiliado.id)} className={styles.actionButton}>Excluir</button>
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