import ItemCount from '../ItemCount';
import './style.scss';

interface IProps {
  product: object;
}
const Card = ({product }: IProps) => {

  const price = product.value.toFixed(2);
  return (
    <article className="product-item">
      <figure>
        <img src={product.image}></img>
      </figure>
      <div className="body">
        <p className='category-product'>{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-price">R${price}</p>
        <ItemCount stock={product.stock}/>
      </div>
    </article>
  );
};

export default Card;
