import { Link } from "react-router-dom";
import CartWidget from "../CartWidget";

const NavBar = () => {
  return (
    <nav>
      <ul className="navbar">
        <li>
          <Link to="loja">Loja</Link>
        </li>
        <li>
          <Link to="category/camisetas">Camisetas</Link>
        </li>
        <li>
          <Link to="category/calcas">Calças</Link>
        </li>
        <li>
          <Link to="category/saias">Saias</Link>
        </li>
        <li>
          <Link to="category/vestidos">Vestidos</Link>
        </li>
        <li>
          <Link to="category/sapatos">Sapatos</Link>
        </li>
        <li>
          <CartWidget/>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
