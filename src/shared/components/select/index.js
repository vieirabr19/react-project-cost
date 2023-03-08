import styles from './style.module.css';

function Select({name, text, value, options, handleOnChange}){
  return (
    <label className={styles.field}>
      <span>{text}</span>
      <select 
        name={name} 
        value={value || ''}
        onChange={handleOnChange}
      >
        <option value="">Selecione a categoria</option>
        {options.length > 0 && options.map(option => <option value={option.id} key={option.id}>{option.name}</option>)}
      </select>
    </label>
  );
}

export default Select;