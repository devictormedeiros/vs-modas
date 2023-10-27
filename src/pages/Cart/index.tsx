import { useNavigate } from "react-router-dom";
import TableCart from "../../components/Header/CartWidget/tableCart";
import "./style.scss";
import { useCart } from "../../context/cartContext";

const CartPage = () => {
  // Hook para navegar entre as rotas
  const navigate = useNavigate();
  const {listCart} = useCart();

  const ReturnStore = () => {
    navigate('/home');
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 py-5">
          <h1 className="w-100 text-center mb-4 text-uppercase section-title">Carrinho</h1>
          {listCart.length > 0 ?
          <TableCart />
          :
          <>
          <p className="text-center w-100">Seu carrinho está vazio, clique no botão abaixo para conhecer nossos produtos</p>
          <button className="mx-auto w-fit btn border d-block mt-4 text-uppercase" onClick={ReturnStore}>Retornar á loja</button>
          </>
        }
        </div>
      </div>
    </div>
  );
};

export default CartPage;
