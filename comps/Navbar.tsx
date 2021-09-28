import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <h1 className={styles.logo}>
        <Link href="/"> Pi Kappa Phi NEU</Link>
      </h1>
      <div className={styles.links}>
        <Link  href="/about">
          About
        </Link>
        <Link  href="/philanthropy">
          Philanthropy
        </Link>
        <Link  href="/contact">
          Contact
        </Link>
        <Link href="/portal/">
          Member Portal
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
