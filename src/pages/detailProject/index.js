import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import CardService from '../../components/project/cardService';
import ProjectForm from '../../components/project/form';
import FormService from '../../components/project/formService';
import Alert from '../../shared/components/alert';
import Button from '../../shared/components/button';

import styles from './style.module.css';

const URL_API = 'http://localhost:500/projects';

function DetailProject(){
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    fetch(`${URL_API}/${id}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
      setProject(data);
      setServices(data.services);
    })
    .catch(err => console.log(err));
  }, [id]);

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm);
  };

  const toggleServiceForm = () => {
    setShowServiceForm(!showServiceForm);
  };

  const editPost = (projectData) => {
    setMessageType('');
    setMessage('');

    if(parseFloat(projectData.budget) < parseFloat(projectData.cost)){
      setMessageType('danger');
      setMessage('O orçamento não pode ser menor que o custo!');
      return;
    }

    fetch(`${URL_API}/${projectData.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(projectData)
    })
    .then(response => response.json())
    .then(data => {
      setMessageType('success');
      setMessage('Projeto atualizado com sucesso!');
      setProject(data);
      toggleProjectForm();
    })
    .catch(err => console.log(err));
  };

  const createService = (project) => {
    setMessageType('');
    setMessage('');

    const lastService = project.services[project.services.length -1];
    lastService.id = uuid();
    lastService.date = new Date();
    const newCost = parseFloat(project.cost) + parseFloat(lastService.cost);

    if(newCost > parseFloat(project.budget)){
      setMessageType('danger');
      setMessage('Orçamento ultrapassado, verifique o valor do serviço!');
      project.services.pop();
      return;
    }

    project.cost = newCost;

    fetch(`${URL_API}/${project.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(project)
    })
    .then(response => response.json())
    .then(data => {
      setMessageType('success');
      setMessage('Serviço criado com sucesso!');
      setProject(data);
      setServices(data.services);
      toggleServiceForm();
    })
    .catch(err => console.log(err));
  };

  const removeService = (id, cost) => {
    setMessageType('');
    setMessage('');
    
    project.services = project.services.filter(service => service.id !== id);
    project.cost = parseFloat(project.cost) - parseFloat(cost);

    fetch(`${URL_API}/${project.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(project)
    })
    .then(response => response.json())
    .then(data => {
      setMessageType('success');
      setMessage('Serviço removido com sucesso!');
      setProject(data);
      setServices(data.services);
    })
    .catch(err => console.log(err));
  };

  const editService = (id) => {
    setShowServiceForm(true);
  };

  return (
    <div className={styles.detail}>
      <div className={styles.header}>
        <h1 className={styles.projectName}>{project.name}</h1>
        <Button type='button' text={!showProjectForm ? 'Editar projeto' : 'Cancelar edição'} onClick={toggleProjectForm} />
      </div>

      <Alert type={messageType} message={message} />

      {!showProjectForm && <div>
        <p><strong>Categoria:</strong> {project.category?.name}</p>
        <p><strong>Orçamento total:</strong> {project.budget}</p>
        <p><strong>Custo total:</strong> {project.cost}</p>
      </div>}

      {showProjectForm && <ProjectForm typeBtn='submit' textBtn='Editar projeto' handleSubmit={editPost} projectData={project} />}

      <hr />

      <div className={styles.header}>
        <h1>Serviços</h1>
        <Button type='button' text={!showServiceForm ? 'Criar serviço' : 'Cancelar'} onClick={toggleServiceForm} />
      </div>

      {showServiceForm && <FormService typeBtn='submit' textBtn='Criar serviço' handleSubmit={createService} projectData={project} />}

      {showServiceForm && <hr />}

      {services.length > 0 && <CardService services={services} editService={editService} removeService={removeService} />}
    </div>
  );
}

export default DetailProject;