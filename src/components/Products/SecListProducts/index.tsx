import Card from "../Card";
import { useEffect, useState } from "react";
import "./style.scss";
import Loading from "../../Loading";
import { get } from "../../../services/api.service";
import { ProductTypes } from "../ProductTypes";
import { debug } from "console";
import { set } from "firebase/database";

// Definindo as propriedades que o componente pode receber
interface IProps {
  title: string;
  categorySlug?: string;
}

const ItemListContainer = ({ title, categorySlug }: IProps) => {
  // criando uma const listProducts iniciando ela com valor de array vazio
  const [listProducts, setListProducts] = useState<ProductTypes[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Função para obter o ID da categoria usando o slug
  async function getCategoryIDBySlug(slug: string | undefined) {
    const response = await get(`products/categories?slug=${slug}`);
    if (response.data && response.data.length > 0) {
      return response.data[0].id;
    }
    return null;
  }

  useEffect(() => {
    setLoading(true);
    // Função para obter os produtos da API
    const getProducts = async () => {
      try {
        let productParams = {};

        // Se um slug de categoria for fornecido, obtenha o ID correspondente
        if (categorySlug) {
          const categoryID = await getCategoryIDBySlug(categorySlug);

          //espera a resposta da função getCategoryIDBySlug e atribui o valor a categoryID
          if (categoryID) {
            productParams = { category: categoryID };
          } else {
            console.warn(
              `A categoria com o slug "${categorySlug}" não foi encontrada.`
            );
  
            // Se a categoria não for encontrada, não há necessidade de continuar
            return;
          }
        }

        // Busque produtos, seja todos ou filtrados por categoria
        const products = await get("products", productParams);
        setListProducts(products?.data);
        setLoading(false);
        
       
    
      } catch (error) {
        console.error("Erro ao obter produtos:", error);
        setError(true);
        setLoading(false);
      }
    };

    getProducts();
  }, [categorySlug]); // O useEffect será re-executado sempre que categorySlug mudar

  return (
    <section>
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-12">
              {title && (
                <h2 className="text-center mb-4 text-uppercase section-title">
                  {title}
                </h2>
              )}
            </div>
          </div>
          <div className="list-products row">
            {listProducts?.length === 0 ? (
              <div className="error-container w-fit text-center alert alert-danger mx-auto my-5">
                <p>Nenhum produto encontrado.</p>
              </div>
            ) : (
              listProducts?.map((product) => (
                <div key={product?.id} className="col-lg-3">
                  <Card product={product} />
                </div>
              ))
            )}
            {error && (
              <div className="error-container w-fit text-center alert alert-danger mx-auto">
                <p>Ocorreu um erro ao obter os produtos.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ItemListContainer;
