import styles from './style.module.css';
import InputText from '../../inputText';
import Select from '../../select';
import { useEffect, useState } from 'react';
import Button from '../../button';

function ProjectForm({textBtn, typeBtn, handleSubmit, dataForm }){
  const [category, setCategory] = useState([]);
  const [project, setProject] = useState(dataForm || {});

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    fetch('http://localhost:500/categories', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
      setCategory(data);
    })
    .catch(err => console.log(err));
  }

  const selectChange = (e) => {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text
      }
    });
  };

  const inputChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    });
  };

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
  }

  return (
    <form onSubmit={submit} className={styles.projectForm}>
      <InputText 
        type='text' 
        name='name' 
        text='Nome do projeto' 
        value={project.name ? project.name : ''}
        placeholder='Insira o nome do projeto' 
        handleOnChange={inputChange}
      />
      <InputText 
        type='number' 
        name='budget' 
        text='Orçamento do projeto' 
        value={project.budget ? project.budget : ''}
        placeholder='Insira o orçamento total' 
        handleOnChange={inputChange}
      />
      <Select 
        name='category_id'
        text='Selecione a categoria'
        options={category}
        value={project.category ? project.category.id : ''}
        handleOnChange={selectChange}
      />
      <Button
        type={typeBtn}
        text={textBtn}
      />
    </form>
  );
}

export default ProjectForm;