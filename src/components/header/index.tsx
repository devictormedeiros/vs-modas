import "./style.scss";
import NavBar from "./NavBar";
import Logotipo from "../Logotipo";


// criando o componente e passando as props que irei utilizar
const Header = () => {
  return (
    <header className="container px-4 fixed-top">
        <div className="row align-items-center">
          <div className="col-lg-3">
            <Logotipo />
          </div>
          <div className="col-lg-9">
            <NavBar/>
          </div>
        </div>
    </header>
  );
};

export default Header;