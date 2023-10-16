import './style.scss';
const logotipo = "/img/logotipo.jpg";

const Logotipo = () => {
    return(
        <a href="/" className="logo">
              <img src={logotipo} alt="logotipo da VS modas" />
            </a>
    )
}

export default Logotipo;