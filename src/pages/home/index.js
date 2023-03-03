import styles from './style.module.css';
import ImgCost from '../../img/savings.svg'
import Button from '../../components/button';

function Home() {
  return (
    <section className={styles.home}>
      <header>
        <h1>Bem vindo ao <span>Cost</span></h1>
        <p>Comece a gerenciar seus projetos agora mesmo!</p>
      </header>
      <div>
        <Button to="/newproject" text="Criar projeto" />
      </div>
      <div>
        <img src={ImgCost} alt="Cost" />
      </div>
    </section>
  );
}

export default Home;