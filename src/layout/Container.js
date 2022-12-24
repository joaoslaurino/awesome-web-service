import styles from './Container.module.css';

// Componente Container utilizado para a personalização de containers

function Container(props) {
  return (
    <div className={`${styles.container} ${styles[props.customClass]}`}>{props.children}</div>
  );
}

export default Container