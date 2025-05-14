import styles from './Contato.module.css';

function Contato() {
  return (
    <div className={styles.container}>
      <h1>Fale Conosco</h1>

      <section className={styles.info}>
        <p><strong>E-mail:</strong> sinterpi@outlook.com</p>
        <p><strong>Telefone:</strong> (86) 3223-1161</p>
        <p><strong>Endereço:</strong> Edifício Karla - R. Olavo Bilac, 1520 - Sala 107 - Centro-Sul, Teresina - PI, 64001-280</p>
      </section>

      <form className={styles.form}>
        <label>
          Nome:
          <input type="text" name="nome" required />
        </label>

        <label>
          E-mail:
          <input type="email" name="email" required />
        </label>

        <label>
          Mensagem:
          <textarea name="mensagem" rows="5" required></textarea>
        </label>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Contato;
