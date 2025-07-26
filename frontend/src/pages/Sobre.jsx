import React from 'react';
import styles from './Sobre.module.css';
import { Link } from 'react-router-dom';

function Sobre() {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Sobre o SINTERPI</h1>

      {/* Seção de História */}
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Nossa História</h2>
        <div className={styles.sectionContent}>
          <p>
            O Sindicato dos Trabalhadores em Assistência Técnica e Extensão Rural do Estado do Piauí (SINTERPI)
            nasceu da necessidade de união e representação dos profissionais que dedicam suas vidas ao
            desenvolvimento rural. O SINTERPI consolidou-se como
            uma voz ativa na defesa dos direitos trabalhistas e na valorização da categoria de extensionistas
            rurais e técnicos agrícolas em todo o Piauí. Ao longo de sua trajetória, o sindicato tem
            enfrentado desafios e conquistado avanços significativos, sempre pautado pelo compromisso
            com a justiça social e o fortalecimento do setor rural piauiense.
          </p>
          {/* Placeholder para imagem de história */}
          {/* <img src="/caminho/para/imagem-historia.jpg" alt="História do SINTERPI" className={styles.sectionImage} /> */}
        </div>
      </section>

      {/* Seção de Missão, Visão e Valores em um grupo */}
      <div className={styles.mvvSectionGroup}>
        {/* Seção de Missão */}
        <section className={styles.mvvSection}>
          <h2 className={styles.sectionHeading}>Nossa Missão</h2>
          <div className={styles.sectionContent}>
            <p>
              Defender e promover os direitos e interesses dos trabalhadores em Assistência Técnica e
              Extensão Rural do Piauí, buscando a valorização profissional, a garantia de condições de
              trabalho dignas e a contribuição para o desenvolvimento rural sustentável do estado.
            </p>
          </div>
        </section>

        {/* Seção de Visão */}
        <section className={styles.mvvSection}>
          <h2 className={styles.sectionHeading}>Nossa Visão</h2>
          <div className={styles.sectionContent}>
            <p>
              Ser reconhecido como o principal agente de transformação social e profissional
              no campo da Assistência Técnica e Extensão Rural no Piauí, inovando na defesa
              dos trabalhadores e sendo referência em ética, transparência e impacto no
              desenvolvimento agrícola e social do estado.
            </p>
          </div>
        </section>
      </div>

      {/* Seção de Valores - Apresentação em cards */}
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Nossos Valores</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>🤝</span>
            <h3>Ética e Transparência</h3>
            <p>Atuamos com a máxima integridade e clareza em todas as nossas ações.</p>
          </div>
          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>✊</span>
            <h3>Defesa dos Direitos</h3>
            <p>Lutamos incansavelmente pelos direitos e pela dignidade dos trabalhadores.</p>
          </div>
          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>🌱</span>
            <h3>Desenvolvimento Sustentável</h3>
            <p>Comprometemo-nos com práticas que beneficiam o meio ambiente e a sociedade.</p>
          </div>
          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>💪</span>
            <h3>Valorização Profissional</h3>
            <p>Buscamos o reconhecimento e o aperfeiçoamento contínuo da nossa categoria.</p>
          </div>
          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>🗣️</span>
            <h3>Diálogo e Participação</h3>
            <p>Incentivamos a voz ativa de nossos filiados na construção das decisões.</p>
          </div>
        </div>
      </section>

      {/* Seção de Atuação */}
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Nossa Atuação</h2>
        <div className={styles.sectionContent}>
          <p>
            O SINTERPI atua em diversas frentes para garantir o bem-estar e o avanço profissional de seus
            filiados. Isso inclui a participação ativa em negociações coletivas de trabalho para assegurar
            melhores salários e condições; a oferta de suporte jurídico e assessoria para questões
            relacionadas à categoria; a promoção de cursos, palestras e workshops para o aprimoramento
            técnico e profissional; e a representação dos interesses dos trabalhadores em fóruns e
            conselhos estaduais e nacionais, defendendo a importância da assistência técnica e extensão rural
            para o desenvolvimento do Piauí.
          </p>
          {/* Placeholder para imagem de atuação */}
          {/* <img src="/caminho/para/imagem-atuacao.jpg" alt="Atuação do SINTERPI" className={styles.sectionImage} /> */}
        </div>
      </section>

      {/* Seção de Chamada para Ação */}
      <section className={`${styles.section} ${styles.ctaSection}`}>
        <h2 className={styles.sectionHeading}>Faça Parte da Nossa Luta!</h2>
        <p>Junte-se ao SINTERPI e fortaleça a nossa categoria.</p>
        <div className={styles.ctaButtons}>
          <Link to="/cadastro" className={styles.primaryCtaButton}>Filie-se Agora</Link>
          <Link to="/contato" className={styles.secondaryCtaButton}>Entre em Contato</Link>
        </div>
      </section>
    </div>
  );
}

export default Sobre;