// // src/components/Header.jsx
// import { Link } from "react-router-dom";
// import styles from "./Header.module.css";

// function Header() {
//   return (
//     <header className={styles.header}>
//       <div className={styles.logo}>SINTERPI</div>
//       <nav className={styles.navLinks}>
//         <Link to="/" className={styles.link}>Início</Link>
//         <Link to="/sobre" className={styles.link}>Sobre</Link>
//         <Link to="/contato" className={styles.link}>Contato</Link>
//         {/* <Link to="/cadastro" className={styles.link}>Cadastro</Link> */}
//         {/* <Link to="/afiliados" className={styles.link}>Afiliados</Link> REMOVER */}
//         {/* <Link to="/login" className={styles.link}>Admin</Link> */}
//       </nav>
//     </header>
//   );
// }

// export default Header;

// frontend/src/components/Header.jsx
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from '../assets/logo.png'; // Importe o logo

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="Logo SINTERPI" className={styles.logoImage} />
          <span className={styles.logoText}>SINTERPI</span>
        </Link>
      </div>
      <nav className={styles.navLinks}>
        <Link to="/" className={styles.link}>Início</Link>
        <Link to="/sobre" className={styles.link}>Sobre</Link>
        <Link to="/contato" className={styles.link}>Contato</Link>
        {/* <Link to="/cadastro" className={styles.link}>Cadastro</Link> */}
        {/* <Link to="/login" className={styles.link}>Admin</Link> */}
      </nav>
    </header>
  );
}

export default Header;