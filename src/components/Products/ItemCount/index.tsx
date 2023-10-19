import "./style.scss";

interface IProps {
  quantity: number;
  stock: number | undefined;
  handleAdd: () => void;
  handleRemove: () => void;
}

const ItemCount = ({ quantity, stock, handleAdd, handleRemove}: IProps) => {

  return (
    <>
      <div className="box-add-cart">
        <button id="btn-decrement" onClick={handleRemove} disabled={quantity <= 1}>
          -
        </button>
        <input type="number" value={quantity} readOnly />
        <button id="btn-increment" onClick={handleAdd} disabled={quantity >= stock}>
          +
        </button>
      </div>
    </>
  );
};

export default ItemCount;
