import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import logoHeader from '../assets/logo.png'; 

function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar o menu hambúrguer

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Logo e Nome SINTERPI - Fixados à esquerda */}
        <Link to="/" className={styles.logoContainer} onClick={closeMenu}>
          <img src={logoHeader} alt="Logo SINTERPI" className={styles.logo} />
          <span className={styles.logoText}>SINTERPI</span>
        </Link>

        {/* Botão Hambúrguer para Mobile - visível apenas em telas pequenas, alinhado à direita */}
        <div className={styles.hamburgerMenu} onClick={toggleMenu}>
          <div className={`${styles.bar} ${menuOpen ? styles.open : ''}`}></div>
          <div className={`${styles.bar} ${menuOpen ? styles.open : ''}`}></div>
          <div className={`${styles.bar} ${menuOpen ? styles.open : ''}`}></div>
        </div>

        {/* Grupo da Navegação e Botão de Filiação - Alinhado à direita em desktop, empilhado em mobile */}
        <div className={`${styles.navAndCtaGroup} ${menuOpen ? styles.navAndCtaGroupOpen : ''}`}>
          {/* Navegação Principal */}
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink} onClick={closeMenu}>
                  Início
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink to="/sobre" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink} onClick={closeMenu}>
                  Sobre
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink to="/contato" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink} onClick={closeMenu}>
                  Contato
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Botão de Filiação */}
          <Link to="/cadastro" className={styles.ctaButton} onClick={closeMenu}>
            Filie-se
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;