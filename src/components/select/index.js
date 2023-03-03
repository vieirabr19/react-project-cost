import styles from './style.module.css';

function Select({name, text, value, options, handleOnChange}) {
  return (
    <label className={styles.form_control}>
      <span>{text}</span>
      <select 
        name={name}
        id={name}
        value={value || ''}
        onChange={handleOnChange}
      >
        <option value=''>Selecione uma opção</option>
        {options.map(option => <option value={option.id} key={option.id}>{option.name}</option>)}
      </select>
    </label>
  )
}

export default Select;