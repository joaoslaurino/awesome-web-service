import styles from './Footer.module.css'
// import "./Footer.css"
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa'

// Componente Footer utilizado em todas as páginas

function Footer () {
    return (
        <div className={styles.footerContainer}>
            <footer className={styles.footer}>
                <ul className={styles.social_list}>
                        <li>
                        <a href="https://github.com/joaoslaurino/binawesome">
                        <FaGithub />
                        </a>
                        </li>
                </ul>
                <p><span>Binawesome &copy; 2022</span></p>
            </footer>
        </div>
        
    );
}

export default Footer