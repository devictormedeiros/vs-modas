import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount';
import './style.scss';

interface IProps {
  product: object;
}
const Card = ({product }: IProps) => {

  const price = product?.price;

  return (
    <article className="product-item">
      <Link to={`/products/${product?.id}`}>
      <figure>
        <img src={product?.images[0].src}></img>
      </figure>
      </Link>
      <div className="body">
        {product?.categories.length > 0 ?(
        <p className='category-product'>{product?.categories[0].name}</p>
        ) : ''}
        <Link to={`/produto/${product?.id}`}> <h3>{product?.name}</h3>  </Link>
        <p className="product-price">R${price}</p>
        {product?.stock_status == 'instock' && product?.stock_quantity > 0 ? <ItemCount stock={product?.stock_quantity} /> : 'Produto indisponível'}
      </div>
 
    </article>
  );
};

export default Card;
