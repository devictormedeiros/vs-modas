import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get } from "../../../services/api.service";
import { ProductTypes, ProductInCart } from "../ProductTypes";
import ItemCount from "../ItemCount";
import Loading from "../../Loading";
import { useCart } from "../../../context/cartContext";

const ItemDetails = () => {
  // Captura o ID do produto a partir da URL
  const { id } = useParams<{ id: string }>();

  // Estados para armazenar o produto, o status de carregamento e a quantidade selecionada
  const [product, setProduct] = useState<ProductTypes>();
  const [loading, setLoading] = useState(true);
  const [qtyProduct, setQtyProduct] = useState(1);

  // Usa o contexto do carrinho
  const { addItem, listCart, clearError } = useCart();

  // Hook para navegar entre as rotas
  const navigate = useNavigate();

  // Incrementa a quantidade do produto
  const handleAddQuantity = () => {
    if (qtyProduct < (product?.stock_quantity || 0)) {
      setQtyProduct(qtyProduct + 1);
    }
  };

  // Decrementa a quantidade do produto
  const handleRemoveQuantity = () => {
    if (qtyProduct > 1) {
      setQtyProduct(qtyProduct - 1);
    }
  };

  // Função para remover as tags HTML da descrição do produto
  const removeHtmlTags = (description: string | undefined) => {
    if (!description || typeof description !== "string") {
      return "";
    }
    return description.replace(/<\/?[^>]+(>|$)/g, "");
  };

  // Verifica se o produto está disponível em estoque
  const isInStock = product?.stock_status === "instock";

  // Efeito para carregar os detalhes do produto ao montar o componente
  useEffect(() => {
    const getProduct = async () => {
      try {
        // Busca os detalhes do produto usando o ID capturado da URL
        const product = await get(`products/${id}`);

        // Atualiza o estado com os dados do produto e define o status de carregamento como false
        setProduct(product?.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao obter produto:", error);
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    console.log("lista carrinho", listCart);
  }, [listCart]);

  // Função chamada ao clicar no botão de adicionar ao carrinho
  const handleAddToCart = () => {
    if (product && qtyProduct) {
      const productWithQty: ProductInCart = {
        ...product,
        qtyCart: qtyProduct,
      };

      // Adiciona o produto ao carrinho e verifica a resposta
      const result: string = addItem(productWithQty);

      if (result === "success") {
        // Navega para o carrinho se a adição foi bem-sucedida
        navigate("/cart");
      } else {
        alert(result);
        clearError();
      }
    }
  };


  return (
    <div className="row">
      {/* Se não estiver carregando, mostra os detalhes do produto */}
      {!loading ? (
        <>
          <div className="col-lg-6">
            {/* Mostra a imagem do produto */}
            <figure>
              <img src={product?.images[0].src} alt={product?.name} />
            </figure>
          </div>
          <div className="col-lg-6">
            {/* Mostra o nome, descrição e preço do produto */}
            <h2 className="mb-4">{product?.name}</h2>
            <p className="mb-4">{removeHtmlTags(product?.short_description)}</p>
            <p className="mb-4">R${product?.price}</p>
            {/* Verifica se o produto está em estoque para mostrar a quantidade e o botão */}
            {isInStock ? (
              <>
                <ItemCount
                  stock={product?.stock_quantity}
                  quantity={qtyProduct}
                  handleAdd={handleAddQuantity}
                  handleRemove={handleRemoveQuantity}
                />
                {/* Essa função é só um reforço porque não tem possibilidade de add mais do que o stock ou 0 */}
                <button disabled={qtyProduct > product.stock_quantity ? true : false} className="btn btn-primary btn-add-cart" onClick={handleAddToCart}
                >
                  Finalizar compra
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
