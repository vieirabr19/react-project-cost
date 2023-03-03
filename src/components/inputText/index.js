import styles from './style.module.css';

function InputText({type, name, text, value, placeholder, handleOnChange}){
  return (
    <label className={styles.form_control}>
      <span>{text}</span>
      <input 
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleOnChange}
      />
    </label>
  );
}

export default InputText;