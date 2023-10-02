import CartWidget from "../CartWidget";

const NavBar = () => {
  return (
    <nav>
      <ul className="navbar">
        <li>
          <a href="/categoria/camisetas">Camisetas</a>
        </li>
        <li>
          <a href="/categoria/calcas">Calças</a>
        </li>
        <li>
          <a href="/categoria/saias">Saias</a>
        </li>
        <li>
          <a href="/categoria/vestidos">Vestidos</a>
        </li>
        <li>
          <a href="/categoria/sapatos">Sapatos</a>
        </li>
        <li>
          <CartWidget/>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
