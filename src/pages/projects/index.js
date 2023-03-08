import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../../components/project/card';

import Alert from '../../shared/components/alert';
import Button from '../../shared/components/button';
import styles from './style.module.css';

const URL_API = 'http://localhost:500/projects';

function Projects(){
  const location = useLocation();
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [project, setProject] = useState([]);

  useEffect(() => {
    if(location.state){
      setMessageType('success');
      setMessage(location.state.message);
    }
  }, [location.state]);

  useEffect(() => {
    fetch(URL_API, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => setProject(data))
    .catch(err => console.error(err));
  }, []);

  const removeProject = (id) => {
    setMessageType('');
    setMessage('');

    fetch(`${URL_API}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(() => {
      setMessageType('success');
      setMessage('Projeto removido com sucesso!');
      setProject(project.filter(data => data.id !== id));
    })
    .catch(err => console.log(err));
  };

  

  return (
    <div className={styles.projects}>
      <header className={styles.header}>
        <h1>Projetos</h1>
        <Button to='/newproject' text='Criar projeto' />
      </header>

      <Alert type={messageType} message={message} />

      {project.length > 0 && <Card project={project} removeProject={removeProject} />}
      {project.length === 0 && <p>Não há projetos cadastrados! <br />Clique em "Criar projeto" para criar.</p>}
    </div>
  );
}

export default Projects;