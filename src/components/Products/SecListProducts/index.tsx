import Card from "../Card";
import React, { useEffect, useState } from "react";
import "./style.scss";
import Loading from "../../Loading";
import { get } from "../../../services/api.service";

interface IProps {
  title: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  stock_status: boolean;
}


const ItemListContainer = ({ title }: IProps) => {
  // criando uma const listProducts iniciando ela com valor de array vazio
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await get("products");
        console.log(products.data);
        setListProducts(products.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao obter produtos:", error);
        setError(true);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

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
          {listProducts.length === 0 && loading === true ? <Loading /> : ""}
          {!error &&
            listProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          {error && (
            <div className="error-container w-fit text-center alert alert-danger mx-auto" >
              <p>Ocorreu um erro ao obter os produtos.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemListContainer;
