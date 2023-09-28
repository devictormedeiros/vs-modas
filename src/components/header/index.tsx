import React, { useState } from "react";
import "./style.scss";
import NavBar from "../NavBar";


// Definindo as props para o componente Header e os tipos dela
interface IProps {
  nameCompany: string;
}

// criando o componente e passando as props que irei utilizar
const Header = ({nameCompany }:IProps) => {

  // criando um estado para o nome da empresa
  const [name, setName] = useState(nameCompany);

  return (
    <header>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-3">
            <a href="/" className="logo">
              {/* Passando a variavel nome que declarei e fiz um set */}
              {name}
            </a>
          </div>
          <div className="col-lg-9">
            <NavBar/>
            {/* <button onClick={() => setName("Vanessa")}>Clique</button> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;