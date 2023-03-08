import { useEffect, useState } from 'react';
import Button from '../../../shared/components/button';

import Input from '../../../shared/components/input';
import Select from '../../../shared/components/select';
import styles from './style.module.css';

function ProjectForm({typeBtn, textBtn, handleSubmit, projectData}){
  const [project, setProject] = useState(projectData || {});
  const [category, setCategory] = useState([]);
  
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = (e) => {
    fetch('http://localhost:500/categories', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => setCategory(data))
    .catch(err => console.log(err));
  };

  const inputOnChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    });
  };

  const selectOnChange = (e) => {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text
      }
    });
  };

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
  }


  return (
    <form className={styles.form} onSubmit={submit}>
      <Input 
        type='text' 
        name='name' 
        text='Nome do projeto' 
        value={project.name ? project.name : ''}
        placeholder='Insira o nome do projeto' 
        handleOnChange={inputOnChange} 
      />
      <Input 
        type='number' 
        name='budget' 
        text='Orçamento do projeto' 
        value={project.budget ? project.budget : ''}
        placeholder='Insira o orçamento total' 
        handleOnChange={inputOnChange} 
      />
      <Select 
        name='category_id' 
        text='Escolha a categoria' 
        value={project.category ? project.category.id : ''} 
        options={category} 
        handleOnChange={selectOnChange} 
      />
      <Button 
        type={typeBtn} 
        text={textBtn} 
      />
    </form>
  );
}

export default ProjectForm;