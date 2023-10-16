import React, { useState } from "react";
import "./style.scss";
import NavBar from "./NavBar";
import Logotipo from "../Logotipo";


// Definindo as props para o componente Header e os tipos dela
interface IProps {
  logoCompany: string;
}

// criando o componente e passando as props que irei utilizar
const Header = ({logoCompany }:IProps) => {

  // criando um estado para o nome da empresa
  const [name, setName] = useState(logoCompany);

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