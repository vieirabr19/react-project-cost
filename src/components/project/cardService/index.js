import ButtonOutline from '../../../shared/components/buttonOutline';
import styles from './style.module.css';

function CardService({services, editService, removeService}){
  return (
    <div className={styles.cards}>
      {services.length > 0 && services.map(service => (
        <div className={styles.card} key={service.id}>
          <h1>{service.name}</h1>
          <p><strong>Custo total:</strong> {service.cost}</p>
          <p>{service.description}</p>
          <div className={styles.footer}>
            <p className={styles.actions}>
              <ButtonOutline type='button' text='Editar' onClick={() => editService(service.id)} />
              <ButtonOutline type='button' text='Excluir' onClick={() => removeService(service.id, service.cost)} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardService;