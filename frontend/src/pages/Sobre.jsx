import styles from './Sobre.module.css';

function Sobre() {
  return (
    <div className={styles.container}>
      <h1>Sobre o SINTERPI</h1>

      <section className={styles.section}>
        <h2>História</h2>
        <p>
          O SINTERPI foi fundado com o propósito de representar e defender os interesses dos
          trabalhadores em assistência técnica e extensão rural do Estado do Piauí. Ao longo dos anos,
          tem se consolidado como uma entidade atuante e essencial para o fortalecimento das políticas
          públicas voltadas ao meio rural.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Valores</h2>
        <ul>
          <li>Ética e transparência na gestão sindical</li>
          <li>Respeito aos direitos dos trabalhadores</li>
          <li>Compromisso com o desenvolvimento sustentável</li>
          <li>Valorização da extensão rural como instrumento de transformação social</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Atuação</h2>
        <p>
          O sindicato atua em diversas frentes, desde negociações trabalhistas, apoio jurídico e
          administrativo aos seus filiados, até a promoção de eventos e formações voltadas ao
          aprimoramento técnico dos profissionais da área.
        </p>
      </section>
    </div>
  );
}

export default Sobre;
