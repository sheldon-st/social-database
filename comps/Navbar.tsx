import { link } from "fs";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav >
      <div className={styles.container}> 
      
      <h1 className={styles.logo}>
        <Link href="/"> 
        <img className={styles.logoImg} src="https://pikapp.org/wp-content/uploads/2018/06/PKP-NameStarShield-Centered-Logo-RGB.png"
        ></img>
        </Link>
      </h1>
      <div className={styles.links}>
        <Link  href="/about">
          <h1 className={`${styles.link} ${styles.linkelara}`}>About</h1>
        </Link>
        <Link  href="/philanthropy">
          <h1 className={`${styles.link} ${styles.linkelara}`}>Philanthropy</h1>
        </Link>
        <Link  href="/contact">
          <h1 className={`${styles.link} ${styles.linkelara}`}>Contact</h1>
        </Link>
        <Link href="/portal/">
          <h1 className={`${styles.link} ${styles.linkelara}`}>Member Portal</h1>
        </Link>
      </div>
      </div>

      <hr className={styles.rounded}></hr>
    </nav>
  );
};

export default Navbar;
