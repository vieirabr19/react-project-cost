import ButtonOutline from '../../buttonOutline';
import styles from './style.module.css';

function ProjectCard({data}) {
  return (
    <div className={styles.cards}>
      {data.length > 0 && data.map(item => (
        <div key={item.id} className={styles.card}>
          <h1>{item.name}</h1>
          <p><strong>Orçamento:</strong> {item.budget}</p>
          <p><strong>Serviços:</strong> {item.services.length}</p>
          <p className={styles.category}>
            <span className={styles[item.category.name.toLowerCase()]}></span>
            {item.category.name}
          </p>
          <div className={styles.actions}>
            <ButtonOutline to={`/detailproject/${item.id}`} text='Detalhes' />
            <ButtonOutline type='button' text='Excluir' />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectCard;