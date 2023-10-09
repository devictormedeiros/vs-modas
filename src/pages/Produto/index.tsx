import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../services/api.service";
import Loading from "../../components/Loading";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  stock_status: boolean;
  short_description: string;
}

const ProdutoPage = () => {
  const { id } = useParams(); // Captura o id da URL
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);

  // Função para remover as tags HTML da descrição
  const removeHtmlTags = (description) => {
    if (!description || typeof description !== "string") {
      return "";
    }

    return description.replace(/<\/?[^>]+(>|$)/g, "");
  };

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

  return (
    <main className="py-5 main-produto">
      <div className="container">
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
                <p className="mb-4">
                  {removeHtmlTags(product?.short_description)}
                </p>
                <p className="mb-4">R${product?.price}</p>
                <button className="btn btn-primary">
                  Adicionar ao carrinho
                </button>
              </div>
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </main>
  );
};

export default ProdutoPage;
