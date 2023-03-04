import ButtonOutline from '../../buttonOutline';
import styles from './style.module.css';

function CardService({services, removeService}) {
  return (
    <div className={styles.cards}>
      {services.map(service => (
        <div className={styles.card} key={service.id}>
          <h1>{service.name}</h1>
          <p><strong>Custo total: </strong> {service.cost}</p>
          <p>{service.description}</p>
          <div className={styles.actions}>
            <ButtonOutline type='button' text='Excluir' onClick={() => removeService(service.id, service.cost)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardService;