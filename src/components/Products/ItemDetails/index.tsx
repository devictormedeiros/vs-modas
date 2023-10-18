import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get } from "../../../services/api.service";
import { ProductTypes } from "../ProductTypes";
import ItemCount from "../ItemCount";
import Loading from "../../Loading";


const ItemDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductTypes>();
  const [loading, setLoading] = useState(true);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const navigate = useNavigate();

  // Função para remover as tags HTML da descrição
  const removeHtmlTags = (description: string | undefined) => {
    if (!description || typeof description !== "string") {
      return "";
    }

    return description.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const { stock_status, stock_quantity } = product || {};
  const isInStock = stock_status === "instock" && stock_quantity > 0;


  useEffect(() => {
    const getProduct = async () => {
      try {
        const product = await get(`products/${id}`);
        console.log(product.data);
        setProduct(product.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao obter produto:", error);
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = () => {  // Step 3
    console.log(`Quantity selected: ${selectedQuantity}`);
    console.log(`Product ID: ${product?.id}`);
    console.log(`/cart/${product.id}/${selectedQuantity}`)
    debugger
    navigate(`/cart/product/${product.id}/quantity/${selectedQuantity}`);



    // Add any other logic for adding to cart here
  };

  return (
    <div className="row">
      {!loading ? (
        <>
          <div className="col-lg-6">
            <figure>
              <img src={product?.images[0].src} alt={product?.name} />
            </figure>
          </div>
          <div className="col-lg-6">
            <h2 className="mb-4">{product?.name}</h2>
            <p className="mb-4">{removeHtmlTags(product?.short_description)}</p>
            <p className="mb-4">R${product?.price}</p>
            {isInStock ? (
              <>
              <ItemCount stock={product?.stock_quantity} onQuantityChange={setSelectedQuantity}/>
              <button className="btn btn-primary btn-add-cart" onClick={handleAddToCart}>
              Adicionar ao carrinho
            </button>
            </>
            ) : (
              "Produto indisponível"
            )}

          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ItemDetails;
