import React, { useState } from 'react';
import emailjs from 'emailjs-com'; 
import styles from './Contato.module.css';

function Contato() {
  // Estados para o formulário e o status de envio
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '', // Adicionado o campo assunto
    message: ''
  });

  const [status, setStatus] = useState(''); // Estado para exibir mensagens de sucesso/erro

  // Função para lidar com a mudança nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página

    // As credenciais do EmailJS devem ser mantidas aqui
    const serviceID = 'service_jj0r9d8';
    const templateID = 'template_0cxbqq7';
    const publicKey = 'L50vjlV0WwPVqgMWT';

    // Verifica se os campos obrigatórios estão preenchidos antes de enviar
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Envia o e-mail usando o EmailJS
    emailjs.send(serviceID, templateID, formData, publicKey)
      .then(() => {
        setStatus('Mensagem enviada com sucesso! Em breve retornaremos o contato.');
        // Limpa o formulário após o envio bem-sucedido
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch((error) => {
        console.error('Erro ao enviar o e-mail:', error);
        setStatus('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Fale Conosco</h1>

      <div className={styles.contactContent}>
        {/* Formulário de Contato */}
        <div className={styles.contactFormContainer}>
          <h2 className={styles.sectionHeading}>Envie uma Mensagem</h2>
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Seu nome completo"
                className={styles.inputField}
                value={formData.name} // Vincula ao estado
                onChange={handleChange} // Lida com a mudança
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="seuemail@exemplo.com"
                className={styles.inputField}
                value={formData.email} // Vincula ao estado
                onChange={handleChange} // Lida com a mudança
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subject">Assunto:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Assunto da mensagem"
                className={styles.inputField}
                value={formData.subject} // Vincula ao estado
                onChange={handleChange} // Lida com a mudança
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Mensagem:</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Escreva sua mensagem aqui..."
                className={styles.textareaField}
                value={formData.message} // Vincula ao estado
                onChange={handleChange} // Lida com a mudança
                required
              ></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>Enviar Mensagem</button>
            {/* Exibe o status da mensagem (sucesso/erro) */}
            {status && <p className={styles.statusMessage}>{status}</p>}
          </form>
        </div>

        {/* Informações de Contato e Mapa */}
        <div className={styles.contactInfoContainer}>
          <h2 className={styles.sectionHeading}>Nossos Contatos</h2>
          <div className={styles.contactDetails}>
            <p className={styles.contactItem}>
              <span className={styles.icon}>📞</span> <strong>Telefone:</strong> (86) 3223-1161
            </p>
            <p className={styles.contactItem}>
              <span className={styles.icon}>📧</span> <strong>Email:</strong> sinterpi@outlook.com
            </p>
            <p className={styles.contactItem}>
              <span className={styles.icon}>📍</span> <strong>Endereço:</strong> Edifício Karla - R. Olavo Bilac, 1520 - Sala 107 - Centro-Sul, Teresina - PI, 64001-280
            </p>
            <p className={styles.contactItem}>
              <span className={styles.icon}>🏢</span> <strong>CNPJ:</strong> 35.155.357/0001-23
            </p>
          </div>

          <h2 className={styles.sectionHeading}>Nossa Localização</h2>
          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.0460423509846!2d-42.80114362593938!3d-5.091200352894306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x78e39f4d85fc679%3A0xa7b6a9c879849e2c!2sR.%20Olavo%20Bilac%2C%201520%20-%20Centro%20(Sul)%2C%20Teresina%20-%20PI%2C%2064001-280!5e0!3m2!1spt-BR!2sbr!4v1715719826656!5m2!1spt-BR!2sbr"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do SINTERPI no Google Maps"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contato;