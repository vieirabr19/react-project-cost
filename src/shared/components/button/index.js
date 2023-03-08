import { Link } from 'react-router-dom';
import styles from './style.module.css';

function Button({type, text, to, onClick}){
  return (<>
    {type 
      ? <button type={type} className={styles.btn} onClick={onClick}>{text}</button> 
      : <Link to={to} className={styles.btn}>{text}</Link>
    }
  </>);
}

export default Button;