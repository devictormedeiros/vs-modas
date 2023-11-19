import { Link } from "react-router-dom";
import "./style.scss";
import { ProductTypes } from "../ProductTypes";

interface IProps {
  product: ProductTypes;
}
const Card = ({ product }: IProps) => {
  const price = product?.price;
  const { stock_status, stock_quantity } = product || {};

const isInStock = stock_status === 'instock' && stock_quantity > 0;


  return (
    <article className="product-item">
      <Link to={`/products/${product?.id}`}>
        <figure>
          <img src={product?.images[0]?.src}></img>
        </figure>
      </Link>
      <div className="body">
        {product?.categories.length > 0 ? (
          <p className="category-product">{product?.categories[0].name}</p>
        ) : (
          ""
        )}
        <Link to={`/produto/${product?.id}`}>
          {" "}
          <h3>{product?.name}</h3>{" "}
        </Link>
        <p className="product-price">R${price}</p>
        {isInStock? '' : 'Produto indisponível'}
      {/* <button className="btn btn-primary btn-add-cart" onClick={}>Adicionar ao carrinho</button> */}
      </div>
    </article>
  );
};

export default Card;
