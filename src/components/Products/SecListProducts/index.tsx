import Card from "../Card";
import { useEffect, useState } from "react";
import "./style.scss";
import Loading from "../../Loading";
import { get } from "../../../services/api.service";
import { ProductTypes } from "../ProductTypes";
import { collection, getDocs, getFirestore, where, query } from "firebase/firestore";

// Definindo as propriedades que o componente pode receber
interface IProps {
  title: string;
  categorySlug?: string;
}

const ItemListContainer = ({ title, categorySlug = "" }: IProps) => {
  // criando uma const listProducts iniciando ela com valor de array vazio
  const [listProducts, setListProducts] = useState<ProductTypes[]>([]);
  const [listProductsFirebase, setListProductsFirebase] = useState<ProductTypes[]>([]);
 // coletando item no firebase para atividade da aula
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
            setLoading(false);
            // Se a categoria não for encontrada, não há necessidade de continuar
            return;
          }
        }

        // Busque produtos, seja todos ou filtrados por categoria
        const products = await get("products", productParams);
        // console.log("lista", products?.data);
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

  // coletando item no firebase para atividade da aula
  useEffect(() => {
    const onMount = async () => {
      const db = getFirestore();
      const itemCollection = collection(db, "item-colection");
  
      // Criação de uma consulta condicional com base no categorySlug
      let queryParams;
      if (categorySlug) {
        queryParams = query(itemCollection, where("categories", "array-contains", categorySlug));
      } else {
        queryParams = itemCollection; // Busca geral, sem filtrar por categoria
      }
  
      const lista = await getDocs(queryParams); // Usando a consulta definida acima
      const listaFirebase = lista.docs.map((doc) => doc.data());
  
      setListProductsFirebase(listaFirebase);
    };
    onMount();
  }, [categorySlug]);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-12">
            {title ? (
              <h2 className="text-center mb-4 text-uppercase section-title">
                {title}
              </h2>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="list-products row">
        <h1>PRODUTOS DO WOOCOMMERCE</h1>
          {listProducts?.length === 0 && loading === true ? <Loading /> : ""}
          {listProducts?.length === 0 && loading === false ? (
            <div className="error-container w-fit text-center alert alert-danger mx-auto my-5">
              <p>Nenhum produto encontrado.</p>
            </div>
          ) : (
            ""
          )}

          {!error &&
            listProducts?.map((product) => (
              <div key={product?.id} className="col-lg-3">
                <Card product={product} />
              </div>
            ))}
            {/* //RENDERIZANDO OS PRODUTOS DO FIREBASE  */}
            <h1>PRODUTOS DO FIREBASE</h1>
            {!error &&
            listProductsFirebase?.map((product) => (
              <div key={product?.id} className="col-lg-3">
                <Card product={product} />
              </div>
            ))}
          {error && (
            <div className="error-container w-fit text-center alert alert-danger mx-auto">
              <p>Ocorreu um erro ao obter os produtos.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemListContainer;
