import styles from './Header.module.css';
import Logo from '../../img/costs_logo.png';
import Nav from '../nav/Nav';

function Header(){
  return (
    <div className={styles.header}>
      <img src={Logo} alt="Logo" />
      <Nav />
    </div>
  );
}

export default Header;