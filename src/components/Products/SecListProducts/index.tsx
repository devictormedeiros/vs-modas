import Card from "../Card";
import React, { useEffect, useState } from "react";
import "./style.scss";
import Loading from "../../Loading";
import { get } from "../../../services/api.service";
import { ProductTypes } from "../ProductTypes";

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
  async function getCategoryIDBySlug(slug) {
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
            console.warn(`Category with slug "${categorySlug}" not found.`);
            setLoading(false);
            // Se a categoria não for encontrada, não há necessidade de continuar
            return;
          }
        }

        // Busque produtos, seja todos ou filtrados por categoria
        const products = await get("products", productParams);
        console.log("lista", products?.data);
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
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center mb-4 text-uppercase section-title">
              {title}
            </h2>
          </div>
        </div>
        <div className="list-products">
          {listProducts?.length === 0 && loading === true ? <Loading /> : ""}
          {listProducts?.length === 0 && loading === false ? (
            <div className="error-container w-fit text-center alert alert-danger mx-auto">
              <p>Nenhum produto encontrado.</p>
              </div>
              ) : ""}
          {!error &&
            listProducts?.map((product) => (
              <Card key={product.id} product={product} />
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
