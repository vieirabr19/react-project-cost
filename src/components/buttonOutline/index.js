import { Link } from 'react-router-dom';

import styles from './style.module.css';

function ButtonOutline({to, type, text, onClick}){
  return (
    <>
      {to ? <Link to={to} className={styles.btn}>{text}</Link> : <button type={type} className={styles.btn} onClick={onClick}>{text}</button>}
    </>
  )
}

export default ButtonOutline;