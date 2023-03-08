import styles from './style.module.css';
import Logo from '../../img/costs_logo.png';
import Nav from '../nav';

function Header(){
  return (
    <div className={styles.header}>
      <img src={Logo} alt="Cost" />
      <Nav />
    </div>
  )
}

export default Header;