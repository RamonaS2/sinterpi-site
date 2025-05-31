import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>Bem-vindo ao SINTERPI</h1>
        <p>
          O Sindicato dos Trabalhadores em Assistência Técnica e Extensão Rural do Estado do Piauí
          (SINTERPI) é uma entidade comprometida com a valorização dos profissionais e a promoção do
          desenvolvimento rural sustentável em todo o estado do Piauí.
        </p>
      </section>

      <section className={styles.mission}>
        <h2>Nossa Missão</h2>
        <p>
          Defender os direitos dos trabalhadores em assistência técnica e extensão rural, promover
          condições dignas de trabalho e atuar de forma ética na construção de uma sociedade mais justa
          e igualitária.
        </p>
      </section>

      <section className={styles.contact}>
        <h2>Informações de Contato</h2>
        <ul>
          <li><strong>CNPJ:</strong> 35.155.357/0001-23</li>
          <li><strong>Endereço:</strong> Edifício Karla - R. Olavo Bilac, 1520 - Sala 107 - Centro-Sul, Teresina - PI, 64001-280</li>
          <li><strong>Telefone:</strong> (86) 3223-1161</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
