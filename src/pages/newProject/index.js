import { useNavigate } from 'react-router-dom';

import ProjectForm from '../../components/project/form';
import styles from './style.module.css';

function NewProject(){
  const navigate = useNavigate();

  const submit = (project) => {
    project.cost = 0;
    project.services = [];
    project.date = new Date();
    
    fetch('http://localhost:500/projects', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(project)
    })
    .then(response => response.json())
    .then(data => {
      navigate('/projects', {state: {message: 'Projeto cadastrado com sucesso!'}});
    })
    .catch(err => console.log(err));
  };

  return (
    <div className={styles.container}>
      <header>
        <h1>Criar projeto</h1>
        <p>Crie e gerencie seus projetos</p>
      </header>

      <ProjectForm typeBtn='submit' textBtn='Criar projeto' handleSubmit={submit} />
    </div>
  );
}

export default NewProject;