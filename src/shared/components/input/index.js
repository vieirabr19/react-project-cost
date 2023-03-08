import styles from './style.module.css';

function Input({type, name, text, value, placeholder, handleOnChange}){
  return (
    <label className={styles.field}>
      <span>{text}</span>
      <input 
        type={type} 
        name={name} 
        value={value} 
        placeholder={placeholder}
        onChange={handleOnChange}
      />
    </label>
  );
}

export default Input;