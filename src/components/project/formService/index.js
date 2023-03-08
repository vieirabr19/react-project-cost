import { useState } from 'react';
import Button from '../../../shared/components/button';
import Input from '../../../shared/components/input';
import styles from './style.module.css';

function FormService({typeBtn, textBtn, handleSubmit, projectData}){
  const [service, setService] = useState({});

  const handleOnChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value
    });
  };
  
  const submit = (e) => {
    e.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);
  }

  return (
    <form className={styles.form}>
      <Input 
        type='text' 
        name='name' 
        text='Nome do serviço'
        placeholder='Insira o nome do serviço' 
        handleOnChange={handleOnChange}
      />
      <Input 
        type='text' 
        name='cost' 
        text='Custo do serviço' 
        placeholder='Insira o custo do serviço' 
        handleOnChange={handleOnChange}
      />
      <Input 
        type='text' 
        name='description' 
        text='Descrição' 
        placeholder='Insira a descrição do serviço' 
        handleOnChange={handleOnChange}
      />
      <Button 
        type={typeBtn} 
        text={textBtn}
        onClick={submit}
      />
    </form>
  );
}

export default FormService;