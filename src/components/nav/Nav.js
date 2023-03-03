import { Link } from 'react-router-dom';

import styles from './Nav.module.css';

function Nav() {
  return (
    <ul className={styles.nav}>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">Empresa</Link></li>
      <li><Link to="/projects">Projetos</Link></li>
      <li><Link to="/contact">Contato</Link></li>
    </ul>
  );
}

export default Nav;