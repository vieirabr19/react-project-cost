import { Link } from 'react-router-dom';
import styles from './style.module.css';

function Button({to, type, text, action}){
  return (
    <>
      {to ? <Link to={to} className={styles.btn}>{text}</Link> : <button type={type} className={styles.btn} onClick={action}>{text}</button>}
    </>
  );
}

export default Button;