import { useEffect, useState } from "react";
import "./style.scss";

interface IProps {
    stock: number;
    onQuantityChange?: (quantity: number) => void;

}
const ItemCount = ({stock,onQuantityChange }: IProps) =>{

    const [qtyProduct, setQtyProduct] = useState(1);

    useEffect(() => {  // Step 2: Call the callback prop when qtyProduct changes
        if(onQuantityChange) {
            onQuantityChange(qtyProduct);
        }
    }, [qtyProduct, onQuantityChange]);

    const addProduct = () => {
        if(qtyProduct < stock){
            setQtyProduct(qtyProduct + 1);
        }
    }
    const removeProduct = () => {
        if(qtyProduct > 1){
        setQtyProduct(qtyProduct - 1);
        }
    }
    return(
        <>  
        <div className="box-add-cart">
            <button id="btn-decrement" onClick={removeProduct}>-</button>
            <input type="number" value={qtyProduct} readOnly/>
            <button id="btn-increment" onClick={addProduct}>+</button>
        </div>
        </>
    )
}

export default ItemCount;