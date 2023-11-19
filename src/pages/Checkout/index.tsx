import {ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import "./style.scss";
import { post } from "../../services/api.service";
import { useCart } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";
import OrderResponse from "../../components/Checkout/OrderResponse";
import OrderSucess from "../../components/Checkout/OrderSucess";

interface IOrderData {
  [key: string]: any;
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  line_items: {
    product_id: number;
    quantity: number;
  }[];
  shipping_lines: [
    {
      method_id: string;
      method_title: string;
      total: string;
    }
  ];
}
interface CheckoutPageProps {
  onSubmit: () => void; // Substitua com a assinatura correta se necessário
}



const CheckoutPage:React.FC<CheckoutPageProps> = ({ onSubmit }) => {
  const {listCart, clearCart} = useCart();
  const [orderResponse, setOrderResponse] = useState<OrderResponse | null>(null);
  const navigate = useNavigate();

  const ReturnStore = () => {
    navigate('/home');
  };
    // Mapeia os itens do carrinho para o formato esperado por 'line_items' ao inicializar o estado
    const initialLineItems = listCart.map(item => ({
      product_id: item.id,
      quantity: item.qtyCart,
    }));

  const [orderData, setOrderData] = useState<IOrderData>({
    payment_method: "",
    payment_method_title: "",
    set_paid: true,
    currency: "BRL",
    currency_symbol: "R$",
    billing: {
      first_name: "",
      last_name: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      email: "",
      phone: "",
    },
    shipping: {
      first_name: "",
      last_name: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
    },
    line_items: initialLineItems,
    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Flat Rate",
        total: "10.00",
      },
    ],
  });

  const handleSubmit:FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setOrderData((prevData) => ({
      ...prevData,

      line_items: listCart.map((item) => ({
        product_id: item.id,
        quantity: item.qtyCart,
      }))
    }));

    const createOrder = async () => {
      try {
        const response = await post('orders', orderData);
        console.log('Pedido criado:', response.data);
        setOrderResponse(response.data);
        clearCart();
      } catch (error) {
        console.error("Erro ao criar pedido:", error);
      }
    };
    createOrder();
  };

  const handleChange : ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const parts = name.split('_');
    const key = parts[0];
    const restOfName = parts.slice(1).join('_');

    setOrderData((prevData) => {
      if (key === 'billing' || key === 'shipping') {
        return {
          ...prevData,
          [key]: {
            ...prevData[key],
            [restOfName]: value,
          },
        };
      } else if(name === 'payment_method') {
        return {
          ...prevData,
          [name]: value,
          payment_method_title: "Transferência Bancária",
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  }
  useEffect(() => {
  console.log(orderData);
}, [orderData]);

  // Você pode adicionar ou remover campos conforme necessário
  return (
    <section className="container">
      {orderResponse ? (
        <OrderSucess orderResponse={orderResponse}/>
      ) : listCart.length > 0 ? (
        <>
        <h2 className="text-center mb-4 text-uppercase section-title">
          Finalizar Pedido
        </h2>
      <form className="form-checkout" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <input onChange={handleChange} type="text" name="billing_first_name" placeholder="Nome" />
          </div>
          <div className="col-lg-6">
            <input onChange={handleChange}
              type="text"
              name="billing_last_name"
              placeholder="Sobrenome"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <input onChange={handleChange}
              type="text"
              name="billing_address_1"
              placeholder="Endereço"
            />
          </div>
          <div className="col-lg-6">
            <input onChange={handleChange}
              type="text"
              name="billing_address_2"
              placeholder="Complemento"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <input onChange={handleChange} type="text" name="billing_city" placeholder="Cidade" />
          </div>
          <div className="col-lg-6">
            <input onChange={handleChange} type="text" name="billing_state" placeholder="Estado" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <input onChange={handleChange} type="text" name="billing_postcode" placeholder="CEP" />
          </div>
          <div className="col-lg-6">
            <input onChange={handleChange} type="text" name="billing_country" placeholder="País" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <input onChange={handleChange} type="email" name="billing_email" placeholder="E-mail" />
          </div>
          <div className="col-lg-6">
            <input onChange={handleChange} type="tel" name="billing_phone" placeholder="Telefone" />
          </div>
          <div className="col-12">
            <h3 className="text-uppercase">Formas de pagamento</h3>
            <div className="form-check ps-0">
              <input onChange={handleChange} type="radio" name="payment_method" value="bacs" id="bacs" />
              <label htmlFor="bacs">Transferência bancária</label>
            </div>
          </div>
        </div>

        <button className="btn border" type="submit">Finalizar Pedido</button>
      </form>
      </>
      ) : (
        <>
        <div className="error-container w-fit text-center alert alert-danger mx-auto my-5">
          <p>Seu carrinho está vazio, clique no botão abaixo para conhecer nossos produtos</p>
        </div>
          <button className="mx-auto w-fit btn border d-block mt-4 text-uppercase" onClick={ReturnStore}>Retornar á loja</button>
          </>
      )}
    </section>
  );
};

export default CheckoutPage;
