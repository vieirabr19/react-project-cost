import { useEffect, useState } from 'react';
import styles from './style.module.css';

function Alert({type, message}){
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if(!message){
      setVisible(false);
      return;
    }
  
    setVisible(true);
  
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <>
      {visible && <div className={`${styles.alert} ${styles[type]}`}>
        {message}
      </div>}
    </>
  );
}

export default Alert;