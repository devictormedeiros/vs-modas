import { useState } from "react";

interface IProps {
    stock: number;
}
const ItemCount = ({stock}: IProps) =>{

    const [qtyProduct, setQtyProduct] = useState(1);

    const addProduct = () => {
        if(qtyProduct < stock){
            setQtyProduct(qtyProduct + 1);;
        }
    }
    const removeProduct = () => {
        if(qtyProduct > 0){
        setQtyProduct(qtyProduct - 1);
        }
    }
    return(
        <>  
        <div className="box-add-cart">
            <button id="btn-decrement" onClick={() => removeProduct()}>-</button>
            <input type="number" value={qtyProduct} readOnly/>
            <button id="btn-increment" onClick={() => addProduct()}>+</button>
        </div>
        <button className="btn btn-primary btn-add-cart">Adicionar ao carrinho</button>
        </>
    )
}

export default ItemCount;