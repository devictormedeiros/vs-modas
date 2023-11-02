import { useNavigate } from "react-router-dom";
import TableCart from "../../components/Header/CartWidget/tableCart";
import "./style.scss";
import { useCart } from "../../context/cartContext";
import { collection, addDoc, getFirestore } from "firebase/firestore";


const CartPage = () => {
  // Hook para navegar entre as rotas
  const navigate = useNavigate();
  const {listCart} = useCart();

  const ReturnStore = () => {
    navigate('/home');
  };
  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    debugger;
    const products = listCart.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        qty: product.qtyCart,
      };
    });
    const order = {
      name,
      email,
      phone,
      products,
    };
    console.log(order);
    try {
      const db = getFirestore(); 
      const ordersCollection = collection(db, "orders"); 
      
      const docRef = await addDoc(ordersCollection, order);
      console.log("Documento adicionado com o ID: ", docRef.id);
  } catch (error) {
      console.error("Erro ao adicionar o documento: ", error);
  }
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
        <div className="col-12">
        <form onSubmit={onSubmitForm} className="form-checkout w-100">
            <label>
              <input
                type="text"
                name="name"
                placeholder="Nome"
              />
            </label>
            <label>
              <input
                type="text"
                name="email"
                placeholder="E-mail"

              />
            </label>
            <label>
              <input
                type="text"
                name="phone"
                placeholder="Telefone"

              />
            </label>
            <button
              type="submit"
              className="mx-auto w-fit btn border d-block mt-4 text-uppercase"
            >
              Finalizar compra
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
