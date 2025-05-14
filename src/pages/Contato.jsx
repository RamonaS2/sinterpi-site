import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import styles from './Contato.module.css';

const Contato = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = 'service_jj0r9d8';
    const templateID = 'template_0cxbqq7';
    const publicKey = 'L50vjlV0WwPVqgMWT';

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then(() => {
        setStatus('Mensagem enviada com sucesso!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setStatus('Erro ao enviar. Tente novamente mais tarde.');
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Entre em Contato</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Nome:
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Mensagem:
          <textarea
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Enviar</button>
        {status && <p className={styles.status}>{status}</p>}
      </form>

      <div className={styles.info}>
        <h3>Informações de Contato</h3>
        <p><strong>Endereço:</strong> Edifício Karla - R. Olavo Bilac, 1520 - Sala 107 - Centro-Sul, Teresina - PI, 64001-280</p>
        <p><strong>Telefone:</strong> (86) 3223-1161</p>
        <p><strong>Email:</strong> sinterpi@outlook.com</p>
        <p><strong>CNPJ:</strong> 35.155.357/0001-23</p>
      </div>

      <div className={styles.mapContainer}>
        <iframe
          title="Localização do SINTERPI"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.0460423509846!2d-42.80114362593938!3d-5.091200352894306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x78e39f4d85fc679%3A0xa7b6a9c879849e2c!2sR.%20Olavo%20Bilac%2C%201520%20-%20Centro%20(Sul)%2C%20Teresina%20-%20PI%2C%2064001-280!5e0!3m2!1spt-BR!2sbr!4v1715719826656!5m2!1spt-BR!2sbr"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

    </div>
  );
};

export default Contato;
