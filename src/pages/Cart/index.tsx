import { useParams } from "react-router-dom";

const CartPage = () => {
    const { productId, quantity } = useParams();
    return (
        <div>
        <p>Produto ID: {productId}</p>
        <p>Quantidade: {quantity}</p>
       
      </div>
    )
}

export default CartPage;