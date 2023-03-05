import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import Button from '../../components/button';
import ProjectForm from '../../components/project/form';
import Alert from '../../components/alert';

import styles from './detailProject.module.css';
import FormService from '../../components/project/formService';
import CardService from '../../components/project/cardService';

const BASE_URL = 'http://localhost:500/projects';

function DetailProject(){
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [editProject, setEditProject] = useState(true);
  const [showFormService, setShowFormService] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application'}
    })
    .then(response => response.json())
    .then(data => {
      setProject(data);
      setServices(data.services);
    })
    .catch(err => console.error(err));    
  },[id]);

  function editPost(project){
    setMessageType('');
    setMessage('');

    if(parseFloat(project.budget) < parseFloat(project.cost)){
      setMessageType('danger');
      setMessage('O orçamento não pode ser menor que o custo do projeto!');
      return;
    }

    fetch(`${BASE_URL}/${project.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(project)
    })
    .then(response => response.json())
    .then(data => {
      setProject(data);
      setMessageType('success');
      setMessage('Projeto alterado com sucesso!');
      toggleProjectForm();
    })
    .catch(err => console.log(err));
  }

  function toggleProjectForm(){
    setEditProject(!editProject);
  }

  function toggleServiceForm(){
    setShowFormService(!showFormService);
  }

  const createService = (project) => {
    setMessageType('');
    setMessage('');

    const lastService = project.services[project.services.length -1]; // pega o último serviço adicionado
    lastService.id = uuid(); // cria um ID único para cada serviço
    const newCost = parseFloat(project.cost) + parseFloat(lastService.cost); // soma o project cost + service cost criado
    
    if(newCost > parseFloat(project.budget)){
      setMessageType('danger');
      setMessage('Orçamento ultrapassado, verifique o valor do serviço!');
      project.services.pop();
      return;
    }
    
    project.cost = newCost;
    
    fetch(`${BASE_URL}/${project.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(project)
    })
    .then(response => response.json())
    .then(data => {
      setMessageType('success');
      setMessage('Serviço criado com sucesso!');
      toggleServiceForm();
    })
    .catch(err => console.log(err));
  }

  const removeService = (id, cost) => {
    setMessageType('');
    setMessage('');

    project.services = project.services.filter(service => service.id !== id);
    project.cost = parseFloat(project.cost) - parseFloat(cost);
    
    fetch(`${BASE_URL}/${project.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(project)
    })
    .then(response => response.json())
    .then(data => {
      setProject(data);
      setServices(data.services);
      setMessageType('success');
      setMessage('Serviço removido com sucesso!');
    })
    .catch(err => console.log(err));
  }

  return (
    <div className={styles.detail}>
      {project.name && (<>
        <header>
          <h1 className={styles.bgColor}>{project.name}</h1>
          <Button type="button" text={editProject ? "Editar projeto" : "Cancelar edição"} action={toggleProjectForm} />
        </header>

        {message && <Alert type={messageType} message={message} />}

        {editProject && <div>
          <p><strong>Categoria:</strong> {project.category.name}</p>
          <p><strong>Total de orçamento:</strong> {project.budget}</p>
          <p><strong>Total utilizado:</strong> {project.cost}</p>
        </div>}

        {!editProject && <ProjectForm textBtn='Editar projeto' typeBtn='submit' handleSubmit={editPost} projectData={project} />}
        </>)}

        <hr />

        <header>
          <h1>Adicione um serviço</h1>
          <Button type="button" text={!showFormService ? "Adicionar serviço" : "Cancelar"} action={toggleServiceForm} />
        </header>

        {showFormService && <FormService typeBtn='submit' textBtn='Adicionar serviço' handleSubmit={createService} projectData={project} />}

        {services.length > 0 && (<>
          <hr />
          <header>
            <h1>Serviços</h1>
          </header>
          <CardService services={services} removeService={removeService} />
        </>)}

    </div>
  )
}

export default DetailProject;