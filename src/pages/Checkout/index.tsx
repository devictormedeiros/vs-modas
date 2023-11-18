import React, {useEffect } from "react";
import "./style.scss";
import { post } from "../../services/api.service";
import { debug } from "console";

const CheckoutPage = ({ onSubmit }) => {
  const [orderData, setUserData] = React.useState({
    payment_method: "bacs",
    payment_method_title: "Transferência Bancária",
    set_paid: true,
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
    line_items: [
      {
        product_id: 93,
        quantity: 2,
      },
    ],
    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Flat Rate",
        total: "10.00",
      },
    ],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const createOrder = async () => {
      try {
        const response = await post('orders', orderData);
        console.log('Pedido criado:', response.data);
      } catch (error) {
        console.error("Erro ao criar pedido:", error);
      }
    };
    createOrder();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parts = name.split('_');
    let key = parts[0];
    let restOfName = parts.slice(1).join('_');

    // debugger;
    setUserData((prevData) => ({
      ...prevData,
     
      [key]: {...prevData[key],
        [restOfName]:value},
    }));
  }
  useEffect(() => {
  console.log(orderData);
}, [orderData]);


  // Você pode adicionar ou remover campos conforme necessário
  return (
    <section className="container">
      <form className="form-checkout" onSubmit={handleSubmit}>
        <h2>Informações de Cobrança</h2>
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
        </div>

        <button type="submit">Finalizar Pedido</button>
      </form>
    </section>
  );
};

export default CheckoutPage;
