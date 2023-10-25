import { useNavigate } from "react-router-dom";
import TableCart from "../../components/Header/CartWidget/tableCart";
import "./style.scss";

const CartPage = () => {
  // Hook para navegar entre as rotas
  const navigate = useNavigate();

  const ReturnStore = () => {
    navigate('/home');
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 py-5">
          <h1 className="w-100 text-center mb-4 text-uppercase section-title">Carrinho</h1>
          <TableCart />
          <p>Retorne a loja clicando no botão para não desconstruir o componente de carrinho</p>
          <button onClick={ReturnStore}>Retornar á loja</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
