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
  const CheckoutPage = () => {
    navigate('/checkout');
  };
  return (

    <section className="container">
      <div className="row">
        <div className="col-12 py-5">
          <h1 className="text-center mb-4 text-uppercase section-title">Carrinho</h1>
          {listCart.length > 0 ?
          <>
          <TableCart />
          <div className="d-flex justify-content-between">
            <button className="btn border text-uppercase" onClick={ReturnStore}>Continuar comprando</button>
            <button className="btn border text-uppercase" onClick={CheckoutPage}>Finalizar compra</button>
          </div>
          </>
          :
          <>
          <p className="text-center w-100">Seu carrinho está vazio, clique no botão abaixo para conhecer nossos produtos</p>
          <button className="mx-auto w-fit btn border d-block mt-4 text-uppercase" onClick={ReturnStore}>Retornar á loja</button>
          </>
        }
        </div>
      </div>
    </section>
  );
};

export default CartPage;
