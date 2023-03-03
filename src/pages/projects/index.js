import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './style.module.css';
import Button from '../../components/button';
import ProjectCard from '../../components/project/card';
import Alert from '../../components/alert';

const API_URL = 'http://localhost:500/projects';

function Projects() {
  const location = useLocation();
  const [projects, setProjects] = useState([]);

  let message = '';
  if(location.state){
    message = location.state.message;
  }

  useEffect(() => {
    fetch(API_URL, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => setProjects(data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div className={styles.projects}>
      <header>
        <h1>Meus projetos</h1>
        <Button to="/newproject" text="Criar projeto" />
      </header>

      {message && <Alert type='success' message={message} />}

      <ProjectCard data={projects} />
    </div>
  );
}

export default Projects;