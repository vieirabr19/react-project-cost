import { useState } from 'react';

import styles from './style.module.css';
import InputText from '../../inputText';
import Button from '../../button';

function FormService({typeBtn, textBtn, handleSubmit, projectData}){
  const [service, setService] = useState([]);

  const handleChange = (e) =>{
    setService({
      ...service,
      [e.target.name]: e.target.value
    });
  }

  const submit = (e) =>{
    e.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <InputText 
        type='text' 
        name='name' 
        text='Nome do serviço'
        placeholder='Insira o nome do serviço'
        handleOnChange={handleChange}
      />
      <InputText 
        type='text' 
        name='cost' 
        text='Custo do serviço'
        placeholder='Insira o valor total'
        handleOnChange={handleChange}
      />
      <InputText 
        type='text' 
        name='description' 
        text='Descrição do serviço'
        placeholder='Insira a descrição'
        handleOnChange={handleChange}
      />
      <Button
        type={typeBtn}
        text={textBtn}
      />
    </form>
  );
}

export default FormService;