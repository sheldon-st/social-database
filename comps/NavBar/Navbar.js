import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <h1>Pi Kappa Phi NEU</h1>
      </div>
      <div>
        <Link className="menu-link" href="/">
          <a>About</a>
        </Link>
        <Link className="menu-link" href="/about">
          <a>Philanthropy</a>
        </Link>
        <Link className="menu-link" href="/ninjas/">
          <a>Member Login</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
