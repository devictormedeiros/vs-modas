import React from "react";
import "./style.scss";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <a href="/" className="logo">
              <img src="https://via.placeholder.com/200x50" alt="logotipo da loja" />
            </a>
          </div>
          <div className="col-lg-9">
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
            </ul>
          </nav>
          </div>
        </div>
      </div>
    </header>
  );
}


export default Header;