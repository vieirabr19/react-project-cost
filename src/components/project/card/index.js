import ButtonOutline from '../../../shared/components/buttonOutline';
import styles from './style.module.css';

function Card({project, removeProject}){
 return (
    <div className={styles.cards}>
      {project.map(res => (
        <div className={styles.card} key={res.id}>
          <h1>{res.name}</h1>
          <p><strong>Orçamento:</strong> {res.budget}</p>
          <p><strong>Serviços:</strong> {res.services.length}</p>
          <p className={styles.category}><span className={styles[res.category.name.toLowerCase()]}></span> {res.category.name}</p>
          <div className={styles.footer}>
            <p className={styles.actions}>
              <ButtonOutline to={`/detailproject/${res.id}`} text='Detalhes' />
              <ButtonOutline type='button' text='Excluir' onClick={() => removeProject(res.id)} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;