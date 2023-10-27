import { Link } from 'react-router-dom';
import './style.scss';
const logotipo = "/img/logotipo.jpg";

const Logotipo = () => {
    return(
        <Link to="/home" title='Home' className="logo">
              <img src={logotipo} alt="logotipo da VS modas" />
        </Link> 
    )
}

export default Logotipo;