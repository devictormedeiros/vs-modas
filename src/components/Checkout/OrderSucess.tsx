import OrderResponse from "./OrderResponse";

interface IProps {
   orderResponse: OrderResponse;
   }
const OrderSucess: React.FC<IProps> = ({orderResponse}) => {
  return (
    <div className="order-sucess">
          <h3>Pedido criado com sucesso!</h3>
          <p>Número do Pedido: <span>{orderResponse.id}</span></p>
          <p>Método de Pagamento: <span>{orderResponse.payment_method_title}</span></p>
          <h4 className="mt-4">Itens do Pedido:</h4>
          <ul>
            {orderResponse.line_items.map((item) => (
              <li key={item.id}>
                <img src={item.image.src} alt={item.name} style={{ width: '50px', height: '50px' }} />
                <span>{item.name} - Quantidade: {item.quantity}</span>
              </li>
            ))}
          </ul>
          <p className="total-order">Total do Pedido: <span>R${orderResponse.total}</span></p>
          <p className="msg-thankyou">
            Obrigado pela compra!
          </p>
        </div>
  );
}   

export default OrderSucess;