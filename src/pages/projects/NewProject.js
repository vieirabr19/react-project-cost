import { useNavigate } from 'react-router-dom';

import styles from './style.module.css';
import ProjectForm from '../../components/project/form';

function NewProject() {
  const navigate = useNavigate();

  const submit = (project) => {
    createProject(project);
  };

  const createProject = (project) => {
    project.cost = 0;
    project.services = [];

    fetch('http://localhost:500/projects', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(project)
    })
    .then(response => response.json())
    .then(data => {
      navigate('/projects', {state: {message: 'Projeto criado com sucesso!'}});
    })
    .catch(err => console.log(err));
  };

  return (
    <div className={styles.newproject}>
      <header>
        <h1>Criar projeto</h1>
        <p>Crie seu projeto para depois adicionar os serviços.</p>
      </header>
      
      <ProjectForm textBtn='Criar projeto' typeBtn='submit' handleSubmit={submit} />
    </div>
  )
}

export default NewProject;