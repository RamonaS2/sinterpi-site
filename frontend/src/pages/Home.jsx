import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import logoHero from '../assets/logo.png';

function Home() {
  return (
    <div className={styles.container}>
      {/* Seção Hero - A grande entrada, com o logo */}
      <section className={styles.hero}>
        <div className={styles.heroLogoContainer}>
          <img src={logoHero} alt="Logo SINTERPI" className={styles.heroLogo} />
        </div>
        <h1 className={styles.heroTitle}>Bem-vindo ao SINTERPI</h1>
        <p className={styles.heroDescription}>
         O Sindicato dos Trabalhadores em Assistência Técnica e Extensão Rural do Estado do Piauí
         (SINTERPI) é uma entidade comprometida com a valorização dos profissionais e a promoção do
         desenvolvimento rural sustentável em todo o estado do Piauí.
        </p>
      </section>

      {/* Seção de Anúncio da Eleição - Mantida por ser um destaque temporário e importante */}
      <section className={styles.electionAnnouncement}>
        <h2 className={styles.electionTitle}>🗳️ Eleições SINTERPI 2025: Sua Voz Importa!</h2>
        <p className={styles.electionText}>
          Participe ativamente da construção do futuro do nosso sindicato. Acesse a plataforma de votação online e exerça seu direito democrático.
        </p>
        <a
          href="https://studio--sinterpi-eleies.us-central1.hosted.app"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.electionButton}
        >
          Acessar Plataforma de Votação
        </a>
        <p className={styles.electionReminder}>
          Sua participação é fundamental para a força da nossa categoria. Não deixe de votar!
        </p>
      </section>

      {/* Seção "Nossas Principais Atuações" - Trazida para a Home como um resumo visual */}
      <section className={styles.whatWeDoSection}>
        <h2 className={styles.sectionTitle}>Nossas Principais Atuações</h2>
        <div className={styles.activitiesGrid}>
          <div className={styles.activityItem}>
            <h3>Defesa de Direitos</h3>
            <p>Atuamos na proteção e promoção dos direitos trabalhistas e sociais da nossa categoria.</p>
          </div>
          <div className={styles.activityItem}>
            <h3>Negociações Coletivas</h3>
            <p>Representamos os trabalhadores em negociações por melhores salários e condições.</p>
          </div>
          <div className={styles.activityItem}>
            <h3>Apoio e Orientação</h3>
            <p>Oferecemos suporte jurídico, social e técnico aos nossos filiados.</p>
          </div>
          <div className={styles.activityItem}>
            <h3>Capacitação e Eventos</h3>
            <p>Promovemos cursos, palestras e eventos para aprimoramento profissional.</p>
          </div>
        </div>
        {/* Transformando "Sobre o SINTERPI" em botão */}
        <p className={styles.moreInfoPrompt}>
          Para mais detalhes sobre nossa missão, valores e história,
          <Link to="/sobre" className={styles.secondaryButton}>
            Visite a página "Sobre o SINTERPI"
          </Link>
          .
        </p>
      </section>

      {/* Seção de Contato Rápido - Mais concisa */}
      <section className={styles.quickContact}>
        <h2 className={styles.sectionTitle}>Fale Conosco!</h2>
        <p>
          Tem dúvidas, sugestões ou precisa de apoio? Estamos à disposição para ajudar.
        </p>
        <a href="/contato" className={styles.contactButton}>Ir para Contato</a>
      </section>
    </div>
  );
}

export default Home;