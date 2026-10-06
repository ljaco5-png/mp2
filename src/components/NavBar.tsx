import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <span className={styles.title}>Jelly Belly Explorer</span>
      <Link className={styles.link} to="/">List</Link>
      <Link className={styles.link} to="/gallery">Gallery</Link>
    </nav>
  );
}